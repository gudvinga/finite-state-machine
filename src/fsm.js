class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error ('Error! The config is undefinite')
        this.config = config;
        this.state = config.initial;
        this.stack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in config.states) {
            this.stack.push(this.state);
            this.state = state;
        }
        else {
            throw new Error ('The state is undefined');
        }
        return this.state;      
    }
    
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var stateTmp = this.state;
        this.stack.push(stateTmp);
        this.state = this.config.states[stateTmp].transitions[event];
        return this.state;
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.stack.push(this.state)
        this.state = this.config.initial;
        return this;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {
        this.stack = [];
    }
}

const config = {
    initial: 'normal',
    states: {
        normal: {
            transitions: {
                study: 'busy',
            }
        },
        busy: {
            transitions: {
                get_tired: 'sleeping',
                get_hungry: 'hungry',
            }
        },
        hungry: {
            transitions: {
                eat: 'normal'
            },
        },
        sleeping: {
            transitions: {
                get_hungry: 'hungry',
                get_up: 'normal',
            },
        },
    }
};


fsm = new FSM(config);
console.log(fsm.changeState('busy'));
console.log(fsm.trigger('get_hungry'));
console.log(fsm.reset());
console.log(fsm);

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
