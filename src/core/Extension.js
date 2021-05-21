import EventsTarget from './EventsTarget'
import { targetSymbol, extensionsSymbol } from './symbols'
import { error } from '../utils/log'


export default class Extension extends EventsTarget
{
    constructor() {
        super()
        this[targetSymbol] = null
        this.init(arguments)
    }

    /**
     * Allows to initialize extension with given arguments.
     * Must be overridden in sub-class.
     */
    init() {}

    /**
     * Returns target on which extension is applied.
     * 
     * @return {Extendable|null}
     */
    getTarget() {
        return this[targetSymbol]
    }

    /**
     * Process applying.
     * Will be called just after applyTo() method will be called.
     * 
     * @param {Extendable} target 
     */
    onApply(target) {}

    /**
     * Process removing.
     * Will be called just at start of remove() method.
     */
    onRemove() {}

    /**
     * Applies extension to the given target.
     * Works only if extension is not applied yet.
     * Triggers 'apply' event.
     * 
     * @param {Extendable} target 
     * @fires apply
     */
    applyTo(target) {
        // Check if extension is not applied yet.
        if (this[targetSymbol] !== null) {
            error('Unable to apply extension: it\'s already applied.')
            return
        }

        this[targetSymbol] = target
        target[extensionsSymbol].push(this)

        // Trigger necessary events.
        this.onApply(target)
        this.trigger('apply', target)
    }

    /**
     * Removes extension from its target.
     * Triggers 'remove' event.
     * 
     * @fires remove
     */
    remove() {
        if (this[targetSymbol] !== null) {
            let target = this[targetSymbol]
            let extensions = target[extensionsSymbol]

            this.onRemove(target)
            this.trigger('remove', target)

            for (let i = 0; i < extensions.length; i++) {
                if (extensions[i] === this) {
                    extensions.splice(i, 1)
                    break
                }
            }

            this[targetSymbol] = null
        }
    }
}