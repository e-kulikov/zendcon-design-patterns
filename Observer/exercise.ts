import { Component } from "./yaafuif";
import {Subject} from "./subject";

export interface User {
    id: string;
    name: string;
}

@Subject()
export class UserStore {
    constructor(private users: User[] = []) {}

    getUserById(id: string): User | undefined {
        return this.users.find(user => user.id === id);
    }

    deleteUserById(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
        (this as unknown as Subject).notify();
    }

    addUser(user: User): void {
        this.users.push(user);
        (this as unknown as Subject).notify();
    }

    listUsers(): User[] {
        return this.users;
    }
}

@Component()
export class UsersList implements Component {
    state: { users?: User[] } = {};

    constructor(private userService: Subject) {}

    update = (userService: Subject & UserStore) => {
        this.state.users = userService.listUsers();
    }

    onInit(): () => void {
        this.userService.subscribe(this);

        return () => {
            this.userService.unsubscribe(this);
        }
    }

    render() {
        if (!this.state.users || this.state.users?.length === 0) return null;

        return `<ul>${this.state.users.map(
            user => `<li id="${user.id}">${user.name}</li>`
        )}</ul>`
    }
}
