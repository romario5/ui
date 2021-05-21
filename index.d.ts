/**
 * @namespace UIScheme
 */
declare namespace UIScheme
{
    class Element
    {

    }

    class Scheme
    {
        /**
         * @param {string} selector Common css selector.
         * @param {Object} data Nested scheme.
         */
        constructor(selector: string, data ?: any);

        /**
         * Builds scheme and returns root element.
         *
         * @param {Scheme} scheme
         * @param {string} [namespace]
         */
        static build(scheme : Scheme, namespace ?: string): Element
    }

    class UI
    {
        /**
         * Allows to initialize additional parameters before rendering.
         * This method may be overridden in sub-class.
         *
         * @param {Object} params
         */
        init(params?: any);

        /**
         * Creates scheme of the UI.
         * The good reason is to keep all structure inside one container (usually named "wrap").
         *
         * @return {Scheme}
         */
        createScheme() : Scheme;
    }
}