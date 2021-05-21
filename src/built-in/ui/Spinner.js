import UI from '../../core/UI'
import Scheme from '../../core/Scheme'
import Styles from '../../core/Styles'

export default class Spinner extends UI {
    init(size, speed) {
        this.params.size = size || 3
        this.params.speed = speed || 360
    }

    createScheme() {
        return new Scheme('div', {
            circle: 'div'
        })
    }

    get size() {
        return this.params.size
    }

    set size(size) {
        this.params.size = size
        this.rootElement.css({
            width: this.params.size.toString() + 'rem',
            height: this.params.size.toString() + 'rem'
        })
    }

    get speed() {
        return this.params.speed
    }

    set speed(v) {
        this.params.speed = v
    }

    onRender(params) {
        this.size = params.size

        let angle = 0
        let applyRotation = () => {
            angle += params.speed / 60
            if (angle > 360) angle -= 360
            this.rootElement.css('transform', 'rotate(' + angle + 'deg)')
            requestAnimationFrame(applyRotation)
        }
        requestAnimationFrame(applyRotation)
    }

    createStyles() {
        return new Styles({
            position: 'relative',


            circle: {
                width: '80%',
                height: '80%',
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-40%',
                marginTop: '-40%',
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid #38a3fc',
                borderBottom: '5px solid #38a3fc',
                borderRadius: '100%'
            }
        })
    }
}