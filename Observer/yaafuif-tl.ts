import type { Component } from "./yaafuif";
import { Subject } from "./subject";

export class TestingLibrary {
    static mount =
        <C extends Component>(
            component: C & Subject,
            watcher: (...args: any[]) => void = () => {}
        ) => {
            component.subscribe({
                update(component: C & Subject) {
                    watcher(component.render())
                }
            });

            return component.render();
        }
}
