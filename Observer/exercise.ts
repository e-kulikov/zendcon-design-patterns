import { Component, ComponentStructure } from "./yaafuif";
import { Subject } from "./subject";

export interface User {
    id: string;
    name: string;
}

@Subject<User[]>()
export class UserStore {
    constructor(private users: User[] = []) {}

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    deleteUserById(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
        (this as unknown as Subject<User[]>).notify(this.users);
    }

    addUser(user: User): void {
        this.users.push(user);
        (this as unknown as Subject<User[]>).notify(this.users);
    }

    listUsers(): User[] {
        return this.users;
    }
}

@Component()
export class UsersList implements ComponentStructure {
    state: { users?: User[] } = {};

    constructor(private userService: Subject<User[]>) {}

    updateUsers = (users: User[]) => {
        this.state.users = users;
    }

    onInit(): () => void {
        this.userService.subscribe(this.updateUsers);

        return () => {
            this.userService.unsubscribe(this.updateUsers);
        }
    }

    render() {
        if (!this.state.users) return null;

        return `<ul>${this.state.users.map(
            user => `<li id="${user.id}">${user.name}</li>`
        )}</ul>`
    }
}
