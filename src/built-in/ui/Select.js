import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'

export default class Select extends UI {

    init(placeholder, value, options) {
        this.params.placeholder = placeholder
        this.params.value = value === undefined ? '' : value
        this.params.options = options || {}
    }

    createScheme() {
        return new Scheme('label', {
            select: 'select',
            label: 'span.label'
        })
    }

    generateOptions() {
        this.select.node.innerHTML = ''
        let emptyOption = document.createElement('option')
        this.select.node.appendChild(emptyOption)
        for (let p in this.params.options) {
            let option = document.createElement('option')
            option.setAttribute('value', p)
            option.textContent = this.params.options[p]
            this.select.node.appendChild(option)
        }
    }


    setOptions(options) {
        this.params.options = options
        this.generateOptions()
    }

    get value() {
        return this.select.node.value
    }

    set value(v) {
        this.select.node.value = v
        this.checkEmpty()
    }

    get disabled() {
        return this.select.node.disabled
    }

    set disabled(v) {
        this.select.node.disabled = v === true
    }

    checkEmpty() {
        this.select.node.value === ''
            ? this.select.node.classList.remove('not-empty')
            : this.select.node.classList.add('not-empty')
    }

    onRender(params) {
        this.label.node.textContent =  params.placeholder
        this.select.node.value = params.value
        this.generateOptions()

        this.checkEmpty()

        this.select.on('change', e => {
            this.checkEmpty()
            this.trigger('change', this.value, ...arguments)
        })
    }

    createStyles() {
        return new Styles({
            display: 'flex',
            flexShrink: 0,
            alignItems: 'center',
            position: 'relative',
            width: '100%',

            select: {
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