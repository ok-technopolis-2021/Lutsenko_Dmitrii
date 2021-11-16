const target = document.querySelector('body');
const skillsBlock = document.createElement("main");
const skillsHeader = document.createElement("header");
const title = document.createElement("h1");
const addButton = document.createElement("button");

skillsBlock.className = 'js-skills-block';
skillsHeader.className = 'js-skills-header';
addButton.className = 'js-skills-add-button';
title.innerText = 'Coding Skills';

skillsHeader.append(title);
skillsHeader.append(addButton);
skillsBlock.append(skillsHeader);
target.append(skillsBlock);
document.addEventListener("DOMContentLoaded", event => {
    addButton.addEventListener('click', addSkillForm);
});

function addSkillForm() {
    const newSkillForm = generateSkillForm();
    skillsBlock.append(newSkillForm);
}

function generateSkillForm() {
    const skillForm = document.createElement("form");
    const skillInfo = document.createElement("div");
    const name = document.createElement("input");
    const percent = document.createElement("input");
    const saveButton = document.createElement("button");
    const progress = document.createElement("progress");
    const progressWrapper = document.createElement("div");

    skillForm.className = 'js-skill-form';
    skillInfo.className = 'js-skill-info';
    name.className = 'js-skill-name';
    percent.className = 'js-skill-percent';
    saveButton.className = 'js-skills-save-button';
    progress.className = 'js-skill-progress';
    progressWrapper.className = 'js-skill-progress-wrapper';

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
            let savedName = document.createElement("h3");
            let savedPercent = document.createElement("label");
            let removeButton = document.createElement("button");
            savedName.innerText = name.value;
            savedPercent = percent.value + '%';
            removeButton.className = 'js-skills-remove-button';
            removeButton.setAttribute('type', 'button');
            removeButton.addEventListener("click", event => {
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
