export interface Subscriber {
    update(subject: Subject): void;
}

export interface Subject {
    subscribe: (subscriber: Subscriber) => this;
    unsubscribe: (subscriber: Subscriber) => this;
    notify: () => void;
}

export function Subject() {
    return function<K extends new (...args: any[]) => {}>(Constructor: K, context: ClassDecoratorContext) {
        if (context.kind !== 'class') throw Error('It must be class');
        return class extends Constructor implements Subject {
            private subscribers: Subscriber[] = [];

            constructor(...args: any[]) {
                super(...args);
            }

            notify() {
                this.subscribers.forEach(
                    subscriber =>
                        subscriber.update(this)
                );
            }

            subscribe(subscriber: Subscriber): this {
                this.subscribers.push(subscriber);
                return this;
            }

            unsubscribe(subscriber: Subscriber): this {
                const index = this.subscribers.indexOf(subscriber);
                if (index !== -1) {
                    this.subscribers.splice(index, 1);
                }
                return this;
            }
        };
    };
}
