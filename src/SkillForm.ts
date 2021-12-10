import * as elementsAttributeConfigs from "./SkillFormElementsAttributeConfigs"
import {SkillFormElementGenerator as elementGenerator} from "./SkillFormElementGenerator"
import createElementWithClassName from "./skillFormUtils";

export class SkillForm {
    private skillForm: HTMLFormElement
    private skillInfo: HTMLElement
    private name: HTMLInputElement
    private percent: HTMLInputElement
    private saveButton: HTMLButtonElement
    private progress: HTMLProgressElement
    private progressWrapper: HTMLElement
    private savedName: HTMLHeadingElement
    private savedPercent: HTMLLabelElement
    private removeButton: HTMLButtonElement
    private onSavingTransformationMap = new Map<Element, HTMLElement>()

    constructor() {
        this.createBaseFormElements()
        this.createAfterSavingFormElements()
        this.skillForm = createElementWithClassName('form', 'js-skill-form')
        this.skillForm.append(this.progressWrapper, this.saveButton)
        this.addAllEventListeners()
    }

    public asHTMLElement() {
        return this.skillForm
    }

    private createBaseFormElements() {
        this.name = elementGenerator.generate('input', 'js-skill-name', elementsAttributeConfigs.nameConfig)
        this.percent = elementGenerator.generate('input', 'js-skill-percent', elementsAttributeConfigs.percentrConfig)
        this.saveButton = elementGenerator.generate('button', 'js-skills-save-button', elementsAttributeConfigs.saveButtonConfig)
        this.progress = elementGenerator.generate('progress', 'js-skill-progress', elementsAttributeConfigs.progressConfig)
        this.skillInfo = elementGenerator.generateContainer('main', 'js-skill-info', this.name, this.percent)
        this.progressWrapper = elementGenerator.generateContainer('div', 'js-skill-progress-wrapper', this.skillInfo, this.progress)
    }

    private createAfterSavingFormElements() {
        this.savedName = document.createElement('h3')
        this.savedPercent = document.createElement('label')
        this.removeButton = elementGenerator.generate('button', 'js-skills-remove-button', elementsAttributeConfigs.removeButtonConfig)
        this.onSavingTransformationMap.set(this.name, this.savedName)
        this.onSavingTransformationMap.set(this.percent, this.savedPercent)
        this.onSavingTransformationMap.set(this.saveButton, this.removeButton)
    }

    private saveForm() {
        if (this.skillForm.checkValidity()) {
            this.savedName.textContent = this.name.value
            this.savedPercent.textContent = this.percent.value + '%'
            for (let element of Array.from(this.skillForm.elements)) {
                this.skillForm
                    .querySelector('.' + element.className)
                    .replaceWith(this.onSavingTransformationMap.get(element))
            }
        }
    }

    private addAllEventListeners() {

        this.skillForm.addEventListener('submit', event => {
            this.saveForm()
            event.preventDefault()
        });

        this.removeButton.addEventListener('click', event => {
            this.skillForm.remove()
        })

        this.percent.addEventListener('input', event => {
            this.progress.value = Number.parseInt(this.percent.value)
        })
    }
}
