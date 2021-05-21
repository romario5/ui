import { eventsSymbol } from './symbols';
import EventsChannel from './EventsChannel';

export default class Localization
{
    constructor(data) {
        this.locale = 'en'
        this.translations = data || {}

        this[eventsSymbol] = new EventsChannel()

        this.translate = (text, data) => {
            let msg = text
            if (this.translations.hasOwnProperty(this.locale) && this.translations[this.locale].hasOwnProperty(text)) {
                msg = this.translations[this.locale][text]
            }
            if (typeof data === 'object') {
                for (let p in data) {
                    msg = msg.replace('{' + p + '}', data[p])
                }
            }
            return msg
        }
    }

    switchLocaleTo(locale) {
        this.locale = locale
        this.trigger('change', locale)
    }

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
}