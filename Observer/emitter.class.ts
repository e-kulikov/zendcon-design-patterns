import { ObserverInterface } from "./observer.class";

export interface EmitterInterface {
    attach(observer: ObserverInterface): void;
    detach(observer: ObserverInterface): void;
}

export class Emitter {
    static decorate =
        <T extends new (...args: any) => any>(methods: (keyof InstanceType<T>)[]) =>
            (Input: T, context: ClassDecoratorContext) => {
                if (context.kind !== 'class') throw Error('Class should be decorated');
                return class extends Input implements EmitterInterface {
                    private observers: ObserverInterface[] = [];
                    constructor(...args: any[]) {
                        super(...args);

                        for (const method of methods) {
                            (this as InstanceType<T>)[method] = (...args: any[]) => {
                                const result = super[method](...args);
                                this.notify(method, args, result);
                                return result;
                            }
                        }
                    }

                    attach(observer: ObserverInterface) {
                        this.observers.push(observer);
                    }

                    detach(observer: ObserverInterface) {
                        const currentIndex = this.observers.findIndex((current) => current === observer);
                        this.observers.splice(currentIndex, 1);
                    }

                    private notify(event: keyof InstanceType<T>, args: any[], result: unknown) {
                        this.observers.forEach(observer => {
                            observer.update(event, args, result, this);
                        });
                    }
                }
            }
}
