import { parseTagName, parseId, parseClassNames, camelCaseToDashSeparated } from '../utils/parsing'
import { elementSymbol, eventsSymbol, extensionsSymbol } from './symbols'
import Extendable from './Extendable'


export default class Element extends Extendable
{
    constructor(selector) {
        super()

        let tagName = parseTagName(selector).toLowerCase()

        // Create node for the element and save reference to it in hidden property.
        this.node = document.createElement(tagName)
        this.node[elementSymbol] = this

        // Set id.
        let id = parseId(selector)
        if (id !== '') {
            this.node.id = id
        }
        
        // Set class name.
        let className = parseClassNames(selector).join(' ')
        if (className !== '') {
            this.node.className = className
        }
        this.selector = tagName + (id === '' ? '' : '#' + id) + (className === '' ? '' : '.' + className.replace(' ', '.'))

        // Define value property for input fields.
        if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
            Object.defineProperty(this, 'value', {
                get() {
                    return this.node.value
                },
                set(v) {
                    this.node.value = v
                }
            })
        }
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





// Hook all native events and process them using custom handler.
// Its necessary to avoid using node property and attach events handler directly to the element.
// For example inside onRender() method:
// this.form.on('submit', e => this.sendRequest())

// List of events tht will be hooked
let nativeEvents = [
    'submit', 'abort', 'beforeinput', 'blur', 'click', 'compositionen', 'paste',
    'compositionstart', 'compositionupdate', 'dblclick', 'error', 'focus', 'change',
    'focusin', 'focusout', 'input', 'keydown', 'keypress', 'keyup', 'load',
    'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mousewheel',
    'mouseup', 'resize', 'scroll', 'select', 'unload', 'wheel', 'touchstart', 'touchend', 'touchmove'
]

// Define custom handler
function eventHook(event, ...params) {
    let parent = event.target
    if (parent.hasOwnProperty(elementSymbol)) {
        event.targetElement = parent[elementSymbol]
    }
    while (parent !== null && parent.hasOwnProperty(elementSymbol)) {
        parent[elementSymbol][eventsSymbol].triggerDirect(event.type, event, ...params)
        parent = parent.parentNode
    }  
}

// Attach handler
for (let i = 0, len = nativeEvents.length; i < len; i++) {
    document.addEventListener(nativeEvents[i], eventHook, {
        capture: true
    })
}