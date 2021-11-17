const target = document.querySelector('body');
const skillsBlock = createElementWithClassName('main', 'js-skills-block');
const skillsHeader = createElementWithClassName('header', 'js-skills-header');
const addButton = createElementWithClassName('button', 'js-skills-add-button');
const title = document.createElement('h1');

title.innerText = 'Coding Skills';

skillsHeader.append(title);
skillsHeader.append(addButton);
skillsBlock.append(skillsHeader);
target.append(skillsBlock);
document.addEventListener('DOMContentLoaded', event => {
    addButton.addEventListener('click', addSkillForm);
});

function addSkillForm() {
    const newSkillForm = generateSkillForm();
    skillsBlock.append(newSkillForm);
}

function generateSkillForm() {
    const skillForm = createElementWithClassName('form', 'js-skill-form');
    const skillInfo = createElementWithClassName('div', 'js-skill-info');
    const name = createElementWithClassName('input', 'js-skill-name');
    const percent = createElementWithClassName('input', 'js-skill-percent');
    const saveButton = createElementWithClassName('button', 'js-skills-save-button');
    const progress = createElementWithClassName('progress', 'js-skill-progress');
    const progressWrapper = createElementWithClassName('div', 'js-skill-progress-wrapper');

    configureName(name);
    configurePercent(percent);
    configureSaveButton(saveButton);
    configureProgress(progress, percent);

    skillInfo.append(name, percent);
    progressWrapper.append(skillInfo, progress);
    skillForm.append(progressWrapper, saveButton);

    skillForm.addEventListener('submit', event => {
        // Я хотел бы вынести это в отдельныйы метод,
        // но почему-то event.preventDefault() тогда не работает
        // Даже если вынести только if, а event.preventDefault() сделать здесь на месте
        if (validateSkillForm(skillForm)) {
            let savedName = document.createElement('h3');
            let savedPercent = document.createElement('label');
            let removeButton = createElementWithClassName('button', 'js-skills-remove-button');
            savedName.innerText = name.value;
            savedPercent = percent.value + '%';
            removeButton.setAttribute('type', 'button');
            removeButton.addEventListener('click', event => {
                skillForm.remove();
            });
            skillForm.querySelector('.' + name.className).replaceWith(savedName);
            skillForm.querySelector('.' + percent.className).replaceWith(savedPercent);
            skillForm.querySelector('.' + saveButton.className).replaceWith(removeButton);
        }
        event.preventDefault();
    });
    return skillForm
}

function configureName(name) {
    name.setAttribute('placeholder', 'Name');
    name.setAttribute('type', 'text');
    name.setAttribute('pattern', '^[A-z][a-z\\s]*$');
    name.setAttribute('required', true);
}

function configurePercent(percent) {
    percent.setAttribute('placeholder', '0-100%');
    percent.setAttribute('type', 'number');
    percent.setAttribute('min', 0);
    percent.setAttribute('max', 100);
    percent.setAttribute('required', true);
}

function configureSaveButton(saveButton) {
    saveButton.setAttribute('type', 'submit');
}

function configureProgress(progress, percent) {
    progress.max = 100;
    progress.value = 0;
    percent.addEventListener('input', event => {
        progress.value = percent.value;
    });
}

function validateSkillForm(form) {
    return form.checkValidity()
}

function createElementWithClassName(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element
}
