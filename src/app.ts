import {SkillsBlock} from "./SkillsBlock"

const target = document.querySelector('body')
target.append(new SkillsBlock().asHTMLElement())
