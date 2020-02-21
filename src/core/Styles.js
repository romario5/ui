import Element from './Element';
import {camelCaseToDashSeparated} from '../utils/parsing';

export default class Styles
{
    constructor(data) {
        this.cssObject = data;
        this.cssString = '';
        this.styleNode = null;

        if (Styles.headNode === undefined) {
            Styles.headNode = document.getElementsByTagName('head')[0];
        }
    }


    renderFor(ui, enforce) {
        // Don't do anything if styles already rendered and enforce is not required.
        if (this.cssString !== '' && enforce !== true) {
            return;
        }

        // Render styles.
        this.cssString = Styles.renderRules(ui, ui.rootElement.selector, this.cssObject);

        // Remove old style node.
        if (this.styleNode !== null) {
            Styles.headNode.removeChild(this.styleNode);
        }

        // Create new style node and append it to head.
        this.styleNode = document.createElement('style');
        this.styleNode.textContent = "\n" + this.cssString + "\n";
        Styles.headNode.appendChild(this.styleNode);
    }


    static renderRules(target, selector, rules) {
        let res = selector + " {\n";
        let nestedRes = '';
        let prefix = '    ';

        for (let p in rules) {
            let v = rules[p];
            if (typeof v === 'string') {
                res += prefix + camelCaseToDashSeparated(p) + ': ' + rules[p] + ";\n";
            } else if (target[p]) {
                let t = target[p] instanceof Element ? target[p] : target[p].rootElement;
                nestedRes += Styles.renderRules(t, selector + ' > ' + t.selector, v);
            } else if (p[0] === ':') {
                nestedRes += Styles.renderRules(target, selector + p, v);
            }
        }

        return res + "}\n" + nestedRes;
    }
}