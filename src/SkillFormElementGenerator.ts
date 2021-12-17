import {createElementWithClassName} from "./skillFormUtils";

export class SkillFormElementGenerator {

    static generate(tagName: string, className: string, attributesConfig: { qualifierName: string, value: string }[]) {
        const element = createElementWithClassName(tagName, className)
        for (const attribute of attributesConfig) {
            element.setAttribute(attribute.qualifierName, attribute.value)
        }
        return element
    }

    static generateContainer(tagName: string, className: string, ...elements: HTMLElement[]) {
        const container = createElementWithClassName(tagName, className)
        for (const element of elements) {
            container.append(element)
        }
        return container
    }
}