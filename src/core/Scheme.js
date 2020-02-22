import Element from './Element';
import {parseId, parseClassNames, parseTagName, camelCaseToDashSeparated} from '../utils/parsing';



let symbolSelector = Symbol('selector');
let symbolData     = Symbol('data');
let symbolClasses  = Symbol('classes');
let symbolId       = Symbol('id');
let symbolTagName  = Symbol('tagName');



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

        this[symbolTagName]  = camelCaseToDashSeparated(parseTagName(selector));
        this[symbolId]       = parseId(selector);
        this[symbolClasses]  = parseClassNames(selector);
        this[symbolData]     = data;
        this[symbolSelector] = this[symbolTagName];

        if (this[symbolId] !== '') {
            this[symbolSelector] += '#' + this[symbolId];
        }

        if (this[symbolClasses].length > 0) {
            this[symbolSelector] += '.' + this[symbolClasses].join('.');
        }
    }

    /**
     * Builds scheme and returns root element.
     * @param {Scheme} scheme
     * @param {string} [namespace]
     */
    static build(scheme, namespace) {
        if (namespace === undefined) {
            namespace = '';
        } else {
            namespace = '.' + camelCaseToDashSeparated(namespace);
        }

        // Prepare root element.
        let rootElement = new Element(scheme[symbolSelector] + namespace);

        // Render all nested items into the root element.
        let data = scheme[symbolData];
        for (let p in data) {

            // If item represented as string - convert it into the scheme.
            if (typeof data[p] === 'string') {
                data[p] = new Scheme(data[p].indexOf('.') < 0 ? data[p] + '.' + p : data[p]);
            }

            // If item is scheme - build it into the root element.
            if (data[p] instanceof Scheme) {
                rootElement[p] = Scheme.build(data[p]);
                rootElement.node.appendChild(rootElement[p].node);

            // If item is UI - append it to the root element.    
            } else if (typeof data[p].appendTo === 'function') {
                data[p].appendTo(rootElement);
                rootElement[p] = data[p];
            }
        }
        return rootElement;
    }
}




