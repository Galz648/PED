

class A {
    state: number

    constructor() {
        this.state = 0
    }
    increment() {
        this.state += 1
        return this 
    }
    then(f: Function) {
        this.state = f()
        return this
    }
}

const a = new A();
a.increment().then(a.increment)
