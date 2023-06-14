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
    // @todo: here the code to implement
}
