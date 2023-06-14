export interface Subscriber {
    update(subject: Subject): void;
}

export interface Subject {
    subscribe: (subscriber: Subscriber) => this;
    unsubscribe: (subscriber: Subscriber) => this;
    notify: () => void;
}

export function Subject() {
    // @todo: here the code to implement
}
