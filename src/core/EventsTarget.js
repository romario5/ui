import { eventsSymbol } from './symbols'
import EventsChannel from './EventsChannel'


export default class EventsTarget
{
    constructor()
    {
        this[eventsSymbol] = new EventsChannel(this)
    }

    /**
     * Adds event listener.
     * Named listeners can be used:
     * chat.on('message -> tray', msg => console.log(msg))
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