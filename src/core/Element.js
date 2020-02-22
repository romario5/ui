import { parseTagName, parseId, parseClassNames, camelCaseToDashSeparated } from '../utils/parsing'
import EventsChannel from './EventsChannel'


let elementSymbol  = Symbol()
let eventsSymbol   = Symbol()
let extSymbol      = Symbol()


// Attach events hook to the elements.
let nativeEvents = [
    'submit', 'abort', 'beforeinput', 'blur', 'click', 'compositionen', 'paste',
    'compositionstart', 'compositionupdate', 'dblclick', 'error', 'focus', 'change',
    'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'load',
    'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mousewheel',
    'mouseup', 'resize', 'scroll', 'select', 'unload', 'wheel', 'touchstart', 'touchend', 'touchmove'
]
function eventHook(event, ...params) {
    if (event.target.hasOwnProperty(elementSymbol)) {
        event.target[elementSymbol].trigger(event.type, event, ...params)
    }
}
for (let i = 0, len = nativeEvents.length; i < len; i++) {
    document.addEventListener(nativeEvents[i], eventHook, {
        capture: true
    })
}


export default class Element
{
    constructor(selector) {
        // Create node for the element and save reference to it in hidden property.
        this.node = document.createElement(parseTagName(selector))
        this.node[elementSymbol] = this

        // Set id.
        let id = parseId(selector)
        if (id !== '') {
            this.node.id = parseId(selector)
        }
        
        // Set class name.
        let className = parseClassNames(selector)
        if (className !== '') {
            this.node.className = className
        }
        this.selector = selector
        
        // Note that all native node events will be passed through this channel.
        this[eventsSymbol] = new EventsChannel(eventsSymbol)

        // Container with applied extensions. Will be replaced with corresponding container.
        this[extSymbol]    = {}
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
        if (typeof style === 'object') {
            for (let p in style) {
                this.node.style[p] = style[p]
            }
        } else {
            this.node.style[style] = value
        }
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
        this[eventsSymbol].on(eventName, handler)
    }

    /**
     * Removes event listener.
     * 
     * @param {string} eventName 
     * @param {function} [handler]
     */
    off(eventName, handler) {
        this[eventsSymbol].off(eventName, handler)
    }

    /**
     * Fires event with given name.
     * 
     * @param {*} eventName 
     * @param  {...any} data 
     */
    trigger(eventName, ...data) {
        this[eventsSymbol].trigger(eventName, ...data)
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
            return this.node.getAttribute(name)
        }
        this.node.setAttribute(name, value)
    }

    /**
     * Returns node of the element.
     * @return {HTMLElement}
     */
    node() {
        return this.node
    }
}

Element.symbol = elementSymbol