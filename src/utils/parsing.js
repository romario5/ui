import {warn} from './log';

let allowedTagNames = [
    'div',
    'p', 'span', 'a',
    'b', 'i', 'u', 'sup', 'sub',
    'font',
    'meta',
    'form', 'label', 'input', 'select', 'option', 'textarea', 'button',
    'ul', 'ol', 'li',
    'table', 'tbody', 'thead', 'tr', 'td',
    'img', 'video', 'source', 'canvas',
    'script', 'style', 'title', 
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'br', 'hr',
    'main', 'section', 'article'
];

let tagNameRegex    = /(^|\s)\w+/ig;
let classNamesRegex = /\.\w+[_\-\w\d]*/ig;
let idRegex         = /#\w+[_\-\w]*/ig;

/**
 * Parses selector and returns tag name.
 * Also checks if tag name is valid.
 * 
 * @param {string} selector 
 */
export function parseTagName(selector) {
    let tagName = selector.match(tagNameRegex);

    if (tagName !== null && tagName.length > 0) {
        tagName =  tagName[0];
    }

    if (tagName === null || tagName.length === 0) {
        return 'div';
    }

    if (!allowedTagNames.includes(tagName)) {
        warn('Invalid tag name used: ' + tagName);
    }

    if (tagName == undefined) {
        return 'div';
    }

    return tagName;
}

/**
 * Parses selector and returns class name.
 * Few classes can be separated by space.
 * 
 * @param {string} selector
 * @return {Array}
 */
export function parseClassNames(selector) {
    let classNames = selector.match(classNamesRegex);
    if (classNames !== null && classNames.length > 0) {
        for (let i = 0; i < classNames.length; i++) {
            classNames[i] = camelCaseToDashSeparated(classNames[i].slice(1));
        }
    }
    return classNames === null ? [] : classNames;
}

/**
 * Parses ID from the given selector.
 * 
 * @param {string} selector
 * @return {string}
 */
export function parseId(selector) {
    let id = selector.match(idRegex);
    if (id !== null && id.length > 0) {
        return id[0].slice(1).trim();
    }
    return '';
}

/**
 * Parses attributes from the given selector.
 * 
 * @param {Object} selector 
 */
export function parseAttributes(selector) {
    let attr = {}
    let f = selector.split('[')
    if (f.length > 1) {
        f = f.split(']')
        if (f.length > 0) {
            f = f.split(/;,/)
            for (let i = 0; i < f.length; i++) {
                let a = f[i].split('=')
                attr[a[0].trim()] = a.length > 1 ? a[1] : ''
            }
        }
    }
    return attr
}


/**
 * Splits string bu upper case.
 * @para {string} str
 * @return {Array}
 */
export function splitByUpperCase(str) {
    return str.replace(/([A-Z]+)/g, ",$1")
        .replace(/^,/, '')
        .split(',');
}


/**
 * Formats string to be useful in the "id" or "class" attribute.
 * @param {string} str
 * @return {string}
 */
export function camelCaseToDashSeparated(str) {
    return splitByUpperCase(str.replace(/\//g, '_').replace(' - ', '-'))
        .join('-')
        .replace(/([a-zA-Z_-])\s+([a-zA-Z_\-\d])/g, "$1-$2")
        .replace(/\s*-+\s*/gi, '-')
        .replace(/-*_-*/gi, '_')
        .toLowerCase();
}