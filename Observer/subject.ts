type Subscriber<T> = (value: T) => void;

export interface Subject<T> {
    subscribe: (subscriber: Subscriber<T>) => this;
    unsubscribe: (subscriber: Subscriber<T>) => this;
    notify: (value: T) => void;
}

export function Subject<T>() {
    return function<K extends new (...args: any[]) => {}>(Constructor: K, context: ClassDecoratorContext) {
        if (context.kind !== 'class') throw Error('It must be class');
        return class extends Constructor implements Subject<T>{
            private subscribers: Subscriber<T>[] = [];

            constructor(...args: any[]) {
                super(...args);
            }

            notify(value?: T) {
                this.subscribers.forEach(
                    subscriber => subscriber(value || this as unknown as T)
                );
            }

            subscribe(subscriber: Subscriber<T>): this {
                this.subscribers.push(subscriber);
                return this;
            }

            unsubscribe(subscriber: Subscriber<T>): this {
                const index = this.subscribers.indexOf(subscriber);
                if (index !== -1) {
                    this.subscribers.splice(index, 1);
                }
                return this;
            }
        };
    };
}
