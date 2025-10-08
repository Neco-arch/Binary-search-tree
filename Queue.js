export class Queue {
    constructor() {
        this.queue = []
    }

    isEmpty() {
       if (this.queue.length === 0) {
        return true
       } else {
        return false
       }
    }

    RemoveQueue() {
        if (this.isEmpty()) {
            return "Queue is empty"
        } else {
            return this.queue.shift()
        }
    }

    AddQueue(item) {
        this.queue.push(item)
    }
}