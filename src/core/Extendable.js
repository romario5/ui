import EventsTarget from './EventsTarget'
import { extensionsSymbol } from './symbols'

export default class Extendable extends EventsTarget
{
    constructor() {
        super()
        this[extensionsSymbol] = []
    }
}