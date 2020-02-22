import Styles from "./Styles";
import Scheme from "./Scheme";
import EventsChannel from './EventsChannel';
import Element from './Element';


let eventsSymbol = Symbol();


export default class UI
{
    constructor(params) {
        // Create untitled events channel for the element.
        this[eventsSymbol] = new EventsChannel();

        // Purify params.
        let defaultParams = this.defaultParams();
        this.params = params || {};
        if (typeof params !== 'object') this.params = {};

        // Copy params from default that are absent in the given.
        for (let p in defaultParams) {
            if (!this.params.hasOwnProperty(p)) {
                this.params[p] = defaultParams[p];
            }
        }

        // Run initialization method.
        this.init(this.params)

        // Do all dirty work :)
        this.render(this.params);
        this.createStyles().renderFor(this, false);
    }

    /**
     * Allows to initialize additional parameters before rendering.
     * This method may be overridden in sub-class.
     * 
     * @param {Object} params 
     */
    init(params) {}

    /**
     * Adds event listener.
     * Can be used named listeners:
     * chat.on('newMessage -> tray', function() { // ... });
     * 
     * @param {string} eventName 
     * @param {function} handler 
     */
    on(eventName, handler) {
        this[eventsSymbol].on(eventName, handler)
    }

    /**
     * Removes event listener.
     * 
     * @param {string} eventName 
     * @param {function} [handler]
     */
    off(eventName, handler) {
        this[eventsSymbol].off(eventName, handler)
    }

    /**
     * Fires event with given name.
     * 
     * @param {*} eventName 
     * @param  {...any} data 
     */
    trigger(eventName, ...data) {
        this[eventsSymbol].trigger(eventName, ...data)
    }

    /**
     * Creates scheme of the UI.
     * The good reason is to keep all structure inside one container (usually named "wrap").
     * 
     * @return {Scheme}
     */
    createScheme() {
        return new Scheme({});
    }

    /**
     * Overrides parameters that was defined for rendering.
     * This method called before creating any nodes but after initialization of parameters.
     * 
     * @param {Object} params
     */
    onBeforeRender(params) {}

    /**
     * Handles rendering of the UI.
     * This method called just after instance creation.
     * 
     * @param {Object} params
     */
    onRender(params) {}

    /**
     * Renders UI with given parameters.
     * @param {Object} params 
     */
    render(params) {
        this.onBeforeRender(params);
        this.trigger('beforeRender');

        let scheme = this.createScheme();

        if (typeof scheme === 'string') {
            scheme = new Scheme(scheme);
        } else if (!(scheme instanceof Scheme)) {
            scheme = new Scheme('div', scheme);
        }

        this.rootElement = Scheme.build(scheme, this.constructor.name);

        for (let p in this.rootElement) {
            if (this.rootElement.hasOwnProperty(p) && (this.rootElement[p] instanceof Element || this.rootElement[p] instanceof UI)) {
                this[p] = this.rootElement[p];
            }
        }

        this.onRender(params);
        this.trigger('render');
        return this;
    }

    /**
     * Override this method to change target in which UI will be rendered to.
     * To change target just return another target.
     * 
     * @param {string|Element} target 
     */
    onBeforeAppend(target) {
        return target;
    }

    appendTo(target) {
        // Allow user to override target.
        let tmpTarget = this.onBeforeAppend(target);
        this.trigger('beforeAppend');

        if (tmpTarget !== undefined) {
            target = tmpTarget;
        }

        let targetNode = target;
        if (typeof target === 'string') {
            targetNode = document.querySelector(target);
        } else if (target instanceof Element) {
            targetNode = target.node;
        } else if (target instanceof UI) {
            targetNode = target.rootElement.node;
        }

        targetNode.appendChild(this.rootElement.node);

        this.onAppend(target);
        this.trigger('append', target);
    }

    /**
     * This method will be called just after appending.
     * @param {string|Element} target 
     */
    onAppend(target) {}

  

    /**
     * Called before loading.
     * Use this method to modify data to be loaded.
     * 
     * @param {Object} data
     */
    onBeforeLoad(data) {}

    /**
     * Modifies or overrides default loading logic.
     * To override loading prevent default of the given event.
     * This method should modify given data object.
     * 
     * @param {Object} data 
     * @param {Event} event
     */
    onLoad(data, event) {}

    /**
     * Modifies or overrides default gathering logic.
     * To override gathering prevent default of the given event.
     * 
     * @param {Object} data 
     * @param {Event} event 
     */
    onGather(data, event) {}

    /**
     * Returns styles of the UI.
     * This method must be overridden in the child class.
     * 
     * @return {Styles}
     */
    createStyles() {
        return new Styles({});
    }

    /**
     * Defines initial parameters of the UI.
     * Can be overridden by sub-class.
     * 
     * @return {Object}
     */
    defaultParams() {
        return {};
    }
}