import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'

export default class Button extends UI {
    init(text, color) {
        this.params.text = text
        this.params.color = color || Button.PRIMARY
    }

    get disabled() {
        return this.rootElement.node.disabled
    }

    set disabled(v) {
        this.rootElement.node.disabled = v === true
    }

    createScheme() {
        return new Scheme('button', {})
    }

    onRender(params) {
        this.rootElement.node.textContent = params.text
        this.rootElement.node.classList.add(params.color)
        this.rootElement.on('click', e => this.trigger('click', e))
    }

    createStyles() {
        return new Styles({
            textAlign: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            height: '2.5rem',
            padding: '0.25rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.25rem',
            color: '#fff',
            cursor: 'pointer',
            userSelect: 'none',
            outline: 'none',

            ':disabled': {
                opacity: 0.5,
                pointerEvents: 'none'
            },

            '.primary': {
                backgroundColor: '#39f',
            },

            '.red': {
                backgroundColor: '#ff3a3a',
            },

            '.primary:hover': {
                backgroundColor: '#1f8fff'
            },

            '.red:hover': {
                backgroundColor: '#eb2123'
            }
        })
    }
}

Button.PRIMARY = 'primary'
Button.RED = 'red'