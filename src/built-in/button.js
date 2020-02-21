import UI from "../core/UI";

/**
 * Simple button scheme.
 */
export default class Button extends UI
{
    createScheme() {
        return 'button';
    }

    onRender(params) {
        // Pass click event from root element to whole UI.
        this.rootElement.on('click', event => this.trigger('click', event));
    }

    styles() {
        return {
            width: 'auto',
            padding: '0.25rem 0.5rem'
        };
    }
}