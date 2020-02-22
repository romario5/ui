let channels = {}

export default class EventsChannel
{
    constructor(name) {
        this.name = name
        this.handlers = {}
    }

    on(eventName, handler) {
        let arr = eventName.split('->')
        arr.forEach((el, i, a) => a[i] = el.trim())

        if (!this.handlers.hasOwnProperty(arr[0])) {
            this.handlers[arr[0]] = new HandlersHub(arr[0])
        }
        this.handlers[arr[0]].addHandler(handler, arr.length > 1 ? arr[1] : undefined)
    }

    off(eventName) {
        let arr = eventName.split('->')
        arr.forEach((el, i, a) => a[i] = el.trim())

        if (this.handlers.hasOwnProperty(arr[0])) {
            if (arr.length > 1 && arr[1].length > 0) {
                this.handlers[arr[0]].removePortHandler(arr[1])
            } else {
                this.handlers[arr[0]].removeAllHandlers()
            }
        }
    }

    trigger(eventName, ...params) {
        let arr = eventName.split('->')
        arr.forEach((el, i, a) => a[i] = el.trim())

        if (this.handlers.hasOwnProperty(arr[0])) {
            if (arr.length > 1 && arr[1].length > 0) {
                this.handlers[arr[0]].runPortHandler(arr[1], this, ...params)
            } else {
                this.handlers[arr[0]].runAllHandlers(this, ...params)
            }
        }
    }

    static get(name) {
    	if (!channels.hasOwnProperty(name)) {
    		channels[name] = new EventsChannel(name)
    	}
    	return channels[name]
    }
}




class HandlersHub
{
	constructor(eventName) {
        this.eventName = eventName
		this.handlers = []
		this.ports = {}
    }
    
    addHandler(handler, port) {
        if (port === undefined) {
            this.handlers.push(handler)
        } else {
            this.ports[port] = handler
        }
    }

    removeAllHandlers() {
        this.handlers = []
        this.ports = {}
    }

    removePortHandler(port) {
        delete(this.ports[port])
    }

    runPortHandler(port, context, ...params) {
        if (this.ports.hasOwnProperty(port)) {
            this.ports[port].call(context, ...params)
        }
    }

    runAllHandlers(context, ...params) {
        for (let i = 0; i < this.handlers.length; i++) {
            this.handlers[i].call(context, ...params)
        }
        for (let p in this.ports) {
            this.ports[p].call(context, ...params)
        }
    }
}
