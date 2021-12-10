import {SkillForm} from "./SkillForm"
import {SkillFormElementGenerator as elementGenerator} from "./SkillFormElementGenerator"
import createElementWithClassName from "./skillFormUtils";

export class SkillsBlock {

    private addButton: HTMLButtonElement
    private title: HTMLHeadingElement
    private skillsHeader: HTMLHeadingElement
    private skillsBlock: HTMLHeadElement

    constructor() {
        this.addButton = createElementWithClassName('button', 'js-skills-add-button')
        this.title = document.createElement('h1')
        this.skillsHeader = elementGenerator.generateContainer('header', 'js-skills-header', this.title, this.addButton)
        this.skillsBlock = elementGenerator.generateContainer('main', 'js-skills-block', this.skillsHeader)
        this.title.textContent = 'Coding Skills'
        this.addAllEventListeners()
    }

    public asHTMLElement() {
        return this.skillsBlock
    }

    private addSkillForm() {
        const newSkillForm = new SkillForm().asHTMLElement()
        this.skillsBlock.append(newSkillForm)
    }

    private addAllEventListeners() {
        document.addEventListener('DOMContentLoaded', event => {
            this.addButton.addEventListener('click', event => {
                this.addSkillForm()
            });
        });
    }
}
