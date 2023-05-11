// YAAFUIF - Yet Another Awesome Frontend UI Framework
import { Subject } from "./subject";

export interface Component {
    render(): string | null;
    onInit(): () => void;
    onDestroy?: () => void;
}

export function Component<T extends new (...args: any[]) => Component> () {
    return function(Constructor: T, context: ClassDecoratorContext): T {
        if (context.kind !== 'class') throw Error('It must be a class');

        @Subject<Component>()
        class ExtendedComponent extends Constructor implements Component {
            public onDestroy?: () => void;
            constructor(...args: any[]) {
                super(...args);

                const onComponentDestroy = super.onInit();

                this.onDestroy = () => {
                    onComponentDestroy();
                    super.onDestroy?.();
                };

                return new Proxy<Component>(this, {
                    set<C extends Component, P extends keyof C>(target: C, name: P, value: any) {
                        if (target[name] !== value) {
                            target[name] = value;
                            (target as unknown as Subject<Component>).notify(target);
                        }
                        return true;
                    }
                });
            }
        }

        return ExtendedComponent;
    }
}
