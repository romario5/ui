import { parseTagName, parseId, parseClassNames, camelCaseToDashSeparated } from '../utils/parsing';
import EventsChannel from './EventsChannel';
import generateUniqueId from '../utils/id-generator';



let eventsSymbol   = Symbol();
let attachedEvents = Symbol();
let extSymbol      = Symbol();

let nativeEvents = [
    'submit', 'abort', 'beforeinput', 'blur', 'click', 'compositionen', 'paste',
    'compositionstart', 'compositionupdate', 'dblclick', 'error', 'focus', 'change',
    'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'load',
    'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mousewheel',
    'mouseup', 'resize', 'scroll', 'select', 'unload', 'wheel', 'touchstart', 'touchend', 'touchmove'
];



export default class Element
{
    constructor(selector) {
        this.node = document.createElement(parseTagName(selector));

        // Set id.
        let id = parseId(selector);
        if (id !== '') {
            this.node.id = parseId(selector);
        }
        
        // Set class name.
        let className = parseClassNames(selector);
        if (className !== '') {
            this.node.className = className;
        }
        this.selector = selector;
        
        this[eventsSymbol]   = new EventsChannel(eventsSymbol);
        this[extSymbol]      = {};
        this[attachedEvents] = [];
    }

    /**
     * Sets one or few styles of the node.
     * If style argument is string only one style will be set to value.
     * If style argument is object styles will be set from its properties 
     * and value will be omitted.
     * 
     * @param {string|object} style 
     * @param {*} value 
     */
    css(style, value) {

    }

    /**
     * Adds event listener.
     * Can be used named listeners:
     * chat.on('newMessage -> tray', function() { // ... });
     * 
     * @param {string} eventName 
     * @param {function} handler 
     */
    on(eventName, handler) {
        this[eventsSymbol].on(eventName, handler);

        if (nativeEvents.includes(eventName) && !this[attachedEvents].includes(eventName)) {
            this[attachedEvents].push(eventName);
            this.node.addEventListener(eventName, (event) => {
                this.trigger(eventName, event);
            });
        }
    }

    /**
     * Removes event listener.
     * 
     * @param {string} eventName 
     * @param {function} [handler]
     */
    off(eventName, handler) {

    }

    /**
     * Fires event with given name.
     * 
     * @param {*} eventName 
     * @param  {...any} data 
     */
    trigger(eventName, ...data) {
        this[eventsSymbol].trigger(eventName, ...data);
    }

    /**
     * Sets or gets attribute of the node.
     * To get attribute value must be omitted.
     * 
     * @param {string} name 
     * @param {*} value 
     */
    attr(name, value) {
        if (value === undefined) {
            return this.node.getAttribute(name);
        }
        this.node.setAttribute(name, value);
    }

    node() {
        return this.node;
    }
}

