import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'

export default class LabeledText extends UI {
    init(label, text, labelWidth) {
        this.params.label = label
        this.params.text = text
        this.params.labelWidth = labelWidth || 'auto'
    }

    get text() {
        return this.params.text
    }

    set text(v) {
        this.params.text = v
        this.textDiv.node.textContent = v
    }

    get label() {
        return this.params.label
    }

    set label(v) {
        this.params.label = v
        this.labelDiv.node.textContent = v
    }

    createScheme() {
        return new Scheme('div.labeled-text', {
            labelDiv: 'div.label',
            textDiv: 'div.text'
        })
    }

    onRender(params) {
        this.textDiv.node.textContent = params.text
        this.labelDiv.node.textContent = params.label
        if (params.labelWidth !== 'auto') {
            this.labelDiv.css('width', params.labelWidth + 'rem')
        }
    }

    createStyles() {
        return new Styles({
            display: 'flex',
            alignItems: 'center',

            labelDiv: {
                fontSize: '0.75rem',
                marginRight: '0.5rem',

                ':after': {
                    content: '":"'
                }
            },

            textDiv: {
                fontSize: '0.75rem'
            }
        })
    }
}