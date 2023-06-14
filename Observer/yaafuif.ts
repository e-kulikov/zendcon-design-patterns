// YAAFUIF - Yet Another Awesome Frontend UI Framework
import { Subject } from "./subject";

export interface ComponentStructure {
    state?: Record<string, any>;
    render(): string | null;
    onInit(): () => void;
    onDestroy?: () => void;
}

export function Component<T extends new (...args: any[]) => ComponentStructure> () {
    return function(Constructor: T, context: ClassDecoratorContext): T {
        if (context.kind !== 'class') throw Error('It must be a class');

        return @Subject<ComponentStructure>()
        class ExtendedComponent extends Constructor {
            public onDestroy?: () => void;
            constructor(...args: any[]) {
                super(...args);

                const onComponentDestroy = super.onInit();

                this.onDestroy = () => {
                    onComponentDestroy();
                    super.onDestroy?.();
                };

                this.state = new Proxy<ComponentStructure>(this, {
                    set<C extends ComponentStructure, P extends keyof C>(
                        target: C & Subject<C>,
                        name: P,
                        value: any,
                        receiver: unknown
                    ) {
                        if (target[name] !== value) {
                            Reflect.set(target, name, value, receiver);
                            target.notify(target);
                        }
                        return true;
                    }
                });
            }
        }
    }
}
