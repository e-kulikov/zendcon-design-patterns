// YAAFUIF - Yet Another Awesome Frontend UI Framework
import {Subject} from "./subject";

export interface ComponentConstructor {
    new(...args: any[]): {
        state?: Record<string, any>;
        render(): string | null;
        onInit(): () => void;
        onDestroy?: () => void;
    };
}

export type Component = InstanceType<ComponentConstructor>;

export function Component<T extends ComponentConstructor> () {
    return function(Constructor: T, context: ClassDecoratorContext) {
        if (context.kind !== 'class') throw Error('It must be a class');

        return @Subject()
        class ExtendedComponent extends Constructor {
            public onDestroy?: () => void;
            constructor(...args: any[]) {
                super(...args);

                const onComponentDestroy = super.onInit();

                this.onDestroy = () => {
                    onComponentDestroy();
                    super.onDestroy?.();
                };

                this.state = new Proxy<Component & Subject>(this as unknown as Component & Subject, {
                    set<C extends Subject, P extends keyof C>(
                        target: C,
                        name: P,
                        value: any,
                        receiver: unknown
                    ) {
                        if (target[name] !== value) {
                            Reflect.set(target, name, value, receiver);
                            target.notify();
                        }
                        return true;
                    }
                });
            }
        } as T & Subject;
    }
}
