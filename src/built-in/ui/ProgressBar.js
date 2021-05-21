import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'


export default class ProgressBar extends UI {
    init(value) {
        if (value < 0) value = 0
        if (value > 100) value = 100
        this.params.value = value
    }

    createScheme() {
        return new Scheme('div.progress-bar', {
            wrap: {
                bar: 'div.bar'
            }
        })
    }

    get value() {
        return this.params.value
    }

    set value(v) {
        if (v < 0) v = 0
        if (v > 100) v = 100
        this.params.value = v
        this.wrap.bar.css('width', v + '%')
    }

    onRender(params) {
        this.wrap.bar.css('width', params.value + '%')
    }

    createStyles() {
        return new Styles({
            display: 'flex',
            flexGrow: 1,

            wrap: {
                height: '0.5rem',
                width: '100%',
                border: '1px solid #999',

                bar: {
                    height: '100%',
                    width: 0,
                    backgroundColor: '#38a3fc'
                }
            }
        })
    }
}