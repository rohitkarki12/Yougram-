class StateManager {
    constructor() {
        this.currentState = 'you'; // Default state
        this.observers = [];
    }

    setState(state) {
        this.currentState = state;
        this.notifyObservers();
    }

    getState() {
        return this.currentState;
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.currentState));
    }
}

// Create a global instance
window.stateManager = new StateManager(); 