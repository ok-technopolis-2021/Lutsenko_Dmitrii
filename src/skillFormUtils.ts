export function createElementWithClassName(tag, className) {
    const element = document.createElement(tag)
    element.className = className
    return element
}