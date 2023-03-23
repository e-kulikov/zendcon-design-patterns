import { EmitterInterface } from "./emitter.class";

export interface ObserverInterface {
    update(event: keyof InstanceType<any>, args: any[], result: unknown, instance?: EmitterInterface): void;
    getEvents(): any[];
    clear(): void;
}

export class Observer {
    static decorate =
        <T extends new (...args: any) => any>(method: keyof InstanceType<T>) =>
            (Input: T, context: ClassDecoratorContext) => {
                if (context.kind !== 'class') throw Error('Class should be decorated');

                return class extends Input implements ObserverInterface {
                    private events: any[] = [];

                    update(event: keyof InstanceType<any>, args: any[], result: unknown, instance?: EmitterInterface) {
                        this.events.push({ event, args, result, instance });
                        super[method]({ event, args, result, instance });
                    }

                    getEvents() {
                        return this.events;
                    }

                    clear() {
                        this.events = [];
                    }
                }
            }
}

export class LoggerObserver {
    private events: any[] = [];

    update(event: keyof InstanceType<any>, args: any[], result: unknown, instance?: EmitterInterface) {
        this.events.push({ event, args, result, instance });
        (this as any).log({ event, args, result, instance });
    }

    getEvents() {
        return this.events;
    }

    clear() {
        this.events = [];
    }
}
