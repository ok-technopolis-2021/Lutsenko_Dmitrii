(function () {
    'use strict';

    var nameConfig = [
        { qualifierName: 'placeholder', value: 'text' },
        { qualifierName: 'type', value: 'Name' },
        { qualifierName: 'pattern', value: '^[A-z][a-z\\s]*$' },
        { qualifierName: 'required', value: 'true' },
    ];
    var percentrConfig = [
        { qualifierName: 'placeholder', value: '0-100%' },
        { qualifierName: 'type', value: 'number' },
        { qualifierName: 'min', value: '0' },
        { qualifierName: 'max', value: '100' },
        { qualifierName: 'required', value: 'true' },
    ];
    var saveButtonConfig = [
        { qualifierName: 'type', value: 'submit' },
    ];
    var progressConfig = [
        { qualifierName: 'max', value: '100' },
        { qualifierName: 'value', value: '0' },
    ];
    var removeButtonConfig = [
        { qualifierName: 'type', value: 'button' },
    ];

    function createElementWithClassName(tag, className) {
        var element = document.createElement(tag);
        element.className = className;
        return element;
    }

    var SkillFormElementGenerator = /** @class */ (function () {
        function SkillFormElementGenerator() {
        }
        SkillFormElementGenerator.generate = function (tagName, className, attributesConfig) {
            var element = createElementWithClassName(tagName, className);
            for (var _i = 0, attributesConfig_1 = attributesConfig; _i < attributesConfig_1.length; _i++) {
                var attribute = attributesConfig_1[_i];
                element.setAttribute(attribute.qualifierName, attribute.value);
            }
            return element;
        };
        SkillFormElementGenerator.generateContainer = function (tagName, className) {
            var elements = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                elements[_i - 2] = arguments[_i];
            }
            var container = createElementWithClassName(tagName, className);
            for (var _a = 0, elements_1 = elements; _a < elements_1.length; _a++) {
                var element = elements_1[_a];
                container.append(element);
            }
            return container;
        };
        return SkillFormElementGenerator;
    }());

    var SkillForm = /** @class */ (function () {
        function SkillForm() {
            this.onSavingTransformationMap = new Map();
            this.createBaseFormElements();
            this.createAfterSavingFormElements();
            this.skillForm = createElementWithClassName('form', 'js-skill-form');
            this.skillForm.append(this.progressWrapper, this.saveButton);
            this.addAllEventListeners();
        }
        SkillForm.prototype.asHTMLElement = function () {
            return this.skillForm;
        };
        SkillForm.prototype.createBaseFormElements = function () {
            this.name = SkillFormElementGenerator.generate('input', 'js-skill-name', nameConfig);
            this.percent = SkillFormElementGenerator.generate('input', 'js-skill-percent', percentrConfig);
            this.saveButton = SkillFormElementGenerator.generate('button', 'js-skills-save-button', saveButtonConfig);
            this.progress = SkillFormElementGenerator.generate('progress', 'js-skill-progress', progressConfig);
            this.skillInfo = SkillFormElementGenerator.generateContainer('main', 'js-skill-info', this.name, this.percent);
            this.progressWrapper = SkillFormElementGenerator.generateContainer('div', 'js-skill-progress-wrapper', this.skillInfo, this.progress);
        };
        SkillForm.prototype.createAfterSavingFormElements = function () {
            this.savedName = document.createElement('h3');
            this.savedPercent = document.createElement('label');
            this.removeButton = SkillFormElementGenerator.generate('button', 'js-skills-remove-button', removeButtonConfig);
            this.onSavingTransformationMap.set(this.name, this.savedName);
            this.onSavingTransformationMap.set(this.percent, this.savedPercent);
            this.onSavingTransformationMap.set(this.saveButton, this.removeButton);
        };
        SkillForm.prototype.saveForm = function () {
            if (this.skillForm.checkValidity()) {
                this.savedName.textContent = this.name.value;
                this.savedPercent.textContent = this.percent.value + '%';
                for (var _i = 0, _a = Array.from(this.skillForm.elements); _i < _a.length; _i++) {
                    var element = _a[_i];
                    this.skillForm
                        .querySelector('.' + element.className)
                        .replaceWith(this.onSavingTransformationMap.get(element));
                }
            }
        };
        SkillForm.prototype.addAllEventListeners = function () {
            var _this = this;
            this.skillForm.addEventListener('submit', function (event) {
                _this.saveForm();
                event.preventDefault();
            });
            this.removeButton.addEventListener('click', function (event) {
                _this.skillForm.remove();
            });
            this.percent.addEventListener('input', function (event) {
                _this.progress.value = Number.parseInt(_this.percent.value);
            });
        };
        return SkillForm;
    }());

    var SkillsBlock = /** @class */ (function () {
        function SkillsBlock() {
            this.addButton = createElementWithClassName('button', 'js-skills-add-button');
            this.title = document.createElement('h1');
            this.skillsHeader = SkillFormElementGenerator.generateContainer('header', 'js-skills-header', this.title, this.addButton);
            this.skillsBlock = SkillFormElementGenerator.generateContainer('main', 'js-skills-block', this.skillsHeader);
            this.title.textContent = 'Coding Skills';
            this.addAllEventListeners();
        }
        SkillsBlock.prototype.asHTMLElement = function () {
            return this.skillsBlock;
        };
        SkillsBlock.prototype.addSkillForm = function () {
            var newSkillForm = new SkillForm().asHTMLElement();
            this.skillsBlock.append(newSkillForm);
        };
        SkillsBlock.prototype.addAllEventListeners = function () {
            var _this = this;
            document.addEventListener('DOMContentLoaded', function (event) {
                _this.addButton.addEventListener('click', function (event) {
                    _this.addSkillForm();
                });
            });
        };
        return SkillsBlock;
    }());

    var target = document.querySelector('body');
    target.append(new SkillsBlock().asHTMLElement());

})();
