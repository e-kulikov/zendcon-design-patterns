import { ComponentStructure } from "./yaafuif";
import { Subject } from "./subject";

export class TestingLibrary {
    static mount =
        <C extends ComponentStructure>(
            component: C & Subject<ComponentStructure>,
            watcher: (...args: any[]) => void = () => {}
        ) => {
            component.subscribe(updatedComponent => {
                watcher(updatedComponent.render());
            });

            return component.render();
        }
}
