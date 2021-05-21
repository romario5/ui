import Element from './Element';
import {parseId, parseClassNames, parseTagName, camelCaseToDashSeparated} from '../utils/parsing';
import { tagNameSymbol, idSymbol, classesArraySymbol, dataSymbol, selectorSymbol } from './symbols';


export default class Scheme
{
    constructor(selector, data) {
        if (typeof selector === 'object') {
            data = selector;
            selector = '';
        }

        if (typeof data !== 'object') {
            data = {};
        }

        this[tagNameSymbol]  = camelCaseToDashSeparated(parseTagName(selector));
        this[idSymbol]       = parseId(selector);
        this[classesArraySymbol] = parseClassNames(selector);
        this[dataSymbol]     = data;
        this[selectorSymbol] = this[tagNameSymbol];

        if (this[idSymbol] !== '') {
            this[selectorSymbol] += '#' + this[idSymbol];
        }

        if (this[classesArraySymbol].length > 0) {
            this[selectorSymbol] += '.' + this[classesArraySymbol].join('.');
        }
    }

    /**
     * Builds scheme and returns root element.
     * @param {Scheme} scheme
     * @param {string} [namespace]
     */
    static build(scheme, namespace) {
        if (namespace === undefined || namespace === '') {
            namespace = '';
        } else {
            namespace = '.' + camelCaseToDashSeparated(namespace);
        }

        // Prepare root element.
        let rootElement = new Element(scheme[selectorSymbol] + namespace);

        // Render all nested items into the root element.
        let data = scheme[dataSymbol];
        for (let p in data) {

            // If item represented as string - convert it into the scheme.
            if (typeof data[p] === 'string') {
                data[p] = new Scheme(data[p].indexOf('.') < 0 ? data[p] + '.' + p : data[p]);
            }

            let newClass = camelCaseToDashSeparated(p)

            // If item is scheme - build it into the root element.
            if (data[p] instanceof Scheme) {
                rootElement[p] = Scheme.build(data[p]);
                rootElement[p].selector += '.' + newClass
                rootElement[p].node.classList.add(newClass)
                rootElement.node.appendChild(rootElement[p].node)

            // If item is UI - append it to the root element.    
            } else if (typeof data[p].appendTo === 'function') {
                data[p].rootElement.selector += '.' + newClass
                data[p].rootElement.node.classList.add(newClass)
                data[p].appendTo(rootElement);
                rootElement[p] = data[p];
            } else if (typeof data[p] === 'object') {
                rootElement[p] = Scheme.build(new Scheme(data[p]));
                rootElement[p].selector += '.' + newClass
                rootElement[p].node.classList.add(newClass)
                rootElement.node.appendChild(rootElement[p].node);
            }
        }
        return rootElement;
    }
}




