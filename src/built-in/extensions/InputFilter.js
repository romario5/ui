import Extension from '../../core/Extension'

/**
 * Allows live filter for input fields which implements 'input' or 'change' events.
 * 
 * Example:
 * let ext = new InputFilter(/^[\d-\s]+$/)
 * ext.applyTo(this.phoneInput)
 */
export default class InputFilter extends Extension
{
    init(regex) {
        this.regex = regex
        this.handler = null
    }

    onApply(target) {
        let initialValue = this.val()
        this.handler = value => {
            if (!this.regex.text(value)) {
                target instanceof UI 
                ? target.value = initialValue 
                : target.node.value = initialValue
            } else {
                initialValue = value
            }
        }

        target.on('input -> filter', this.handler)
        target.on('change -> filter', this.handler)
    }

    onRemove(target) {
        target.off('input -> filter')
        target.off('change -> filter')
    }
}