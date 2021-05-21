import Styles from "./Styles"
import Scheme from "./Scheme"
import Element from './Element'
import getUniqueId from '../utils/id-generator'
import { classesArraySymbol, classNameSymbol, eventsSymbol, isStylesRendered } from './symbols'
import Extendable from './Extendable'


export default class UI extends Extendable
{
    constructor(params) {
        super()

        // Ensure that class name is specified.
        if (!this.constructor.hasOwnProperty(classNameSymbol)) {
            this.constructor[classNameSymbol] = getUniqueId()
        }

        // Purify params.
        let defaultParams = this.defaultParams()
        this.params = typeof params === 'object' ? params : {}

        // Copy params from default that are absent in the given.
        if (typeof defaultParams === 'object' && typeof params === 'object') {
            for (let p in defaultParams) {
                if (!this.params.hasOwnProperty(p)) {
                    this.params[p] = defaultParams[p]
                }
            }
        }

        // Run initialization method.
        this.init(...arguments)

        // Do all dirty work :)
        this.render(this.params);

        if (!this.constructor.hasOwnProperty(isStylesRendered)) {
            this.createStyles().renderFor(this, false)
            this.constructor[isStylesRendered] = true
        }
    }

    /**
     * Allows to initialize additional parameters before rendering.
     * This method may be overridden in sub-class.
     * 
     * @param {Object} params 
     */
    init(params) {}

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
     * 
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

        let namespace = scheme[classesArraySymbol].join(' ')
        if (namespace.length <= 1 || namespace === 'Function') {
            namespace = this.constructor[classNameSymbol]
        } else {
            namespace = ''
        }
        this.rootElement = Scheme.build(scheme, namespace);

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

    /**
     * Appends UI to the given target.
     * If target is string it will be considered as CSS selector.
     * 
     * @param {string|Element|UI} target 
     */
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
     * 
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
     * Can returns any static object because all properties will be copied in the final params.
     * IMPORTANT! Nested objects will be copied as references.
     * 
     * @return {Object|null}
     */
    defaultParams() {
        return null;
    }
}