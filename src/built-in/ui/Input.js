import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'

export default class Input extends UI {
    init(placeholder, value, type) {
        this.params.placeholder = placeholder
        this.params.value = value === undefined ? '' : value
        this.params.type = type || Input.TEXT
    }

    createScheme() {
        return new Scheme('label', {
            input: 'input',
            label: 'span.label'
        })
    }

    get value() {
        return this.input.node.value
    }

    set value(v) {
        this.input.node.value = v
        this.checkEmpty()
    }

    get disabled() {
        return this.input.node.disabled
    }

    set disabled(v) {
        this.input.node.disabled = v === true
    }

    focus() {
        this.input.node.focus()
    }

    checkEmpty() {
        this.input.node.value === ''
            ? this.input.node.classList.remove('not-empty')
            : this.input.node.classList.add('not-empty')
    }

    onRender(params) {
        this.label.node.textContent =  params.placeholder
        this.input.node.value = params.value
        this.input.node.setAttribute('type', params.type)
        this.checkEmpty()

        this.input.on('change', e => {
            this.checkEmpty()
            this.trigger('change', this.value, ...arguments)
        })

        this.input.on('input', () => {
            this.checkEmpty()
            this.trigger('input', this.value, ...arguments)
        })
    }

    createStyles() {
        return new Styles({
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            position: 'relative',
            width: '100%',

            input: {
                display: 'flex',
                padding: '0 0.75rem',
                width: '100%',
                height: '2.5rem',
                fontSize: '0.95rem',
                borderRadius: '0.25rem',
                border: '1px solid #ccc',
                outline: 'none',

                ':disabled': {
                    opacity: 0.5,
                    pointerEvents: 'none'
                },

                ':disabled + .label': {
                    opacity: 0.5,
                    pointerEvents: 'none'
                },

                ':focus': {
                    borderColor: '#38a3fc',
                    boxShadow: '0 0 0 1px #38a3fc'
                },

                '.not-empty + .label': {
                    top: '-0.75rem'
                },

                ':focus + .label': {
                    top: '-0.75rem'
                }
            },

            label: {
                position: 'absolute',
                left: '0.4rem',
                top: '0.58rem',
                fontSize: '0.8rem',
                color: '#999',
                padding: '0.1rem 0.35rem',
                backgroundColor: '#fff',
                marginRight: 'auto',
                transition: '0.25s',
                pointerEvents: 'none'
            }
        })
    }
}

Input.TEXT = 'text'
Input.NUMBER = 'number'
Input.EMAIL = 'email'
Input.PASSWORD = 'password'