import {TestingLibrary} from "./yaafuif-tl";
import {User, UsersList, UserStore} from "./exercise";
import {Subject} from "./subject";
import {ComponentStructure} from "./yaafuif";

const store =
    new UserStore() as unknown as UserStore & Subject<User[]>;
const component =
    new UsersList(store) as unknown as UsersList & Subject<ComponentStructure>

describe('Rendering', () => {
    const watcher = jest.fn();
    const mounted = TestingLibrary.mount(component, watcher);

    it('should be empty on initial render', () => {
        expect(mounted).toEqual(null);
    });

    it('should update the render result', () => {
        store.addUser({id: 'test-user-id', name: 'Test User'});

        expect(watcher).toHaveBeenCalledWith(
            `<ul><li id="test-user-id">Test User</li></ul>`
        );
    });

    describe('under the hood', () => {
        it('Component state must be implemented as a proxy', () => {
            // It is impossible to determine whether the object is Proxy or not: https://2ality.com/2014/12/es6-proxies.html#transparent-virtualization-and-handler-encapsulation
            // but here a dirty hack is applied for test purposes only (see jest.setup.js file)
            expect(component.state).toBeInstanceOf(Proxy);
        });
    });
});
