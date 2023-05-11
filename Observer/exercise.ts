import { Component } from "./yaafuif";
import { Subject } from "./subject";

interface User {
    id: string;
    name: string;
}

@Subject<User[]>()
export class UserStore {
    private users: User[] = [];

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
export class UsersList implements Component {
    private users?: User[];

    constructor(private userService: Subject<User[]>) {}

    updateUsers(users: User[]) {
        this.users = users;
    }

    onInit(): () => void {
        this.userService.subscribe(this.updateUsers);

        return () => {
            this.userService.unsubscribe(this.updateUsers);
        }
    }

    render() {
        if (!this.users) return null;

        return `<ul>${this.users.map(
            user => `<li id="${user.id}">${user.name}</li>`
        )}</ul>`
    }
}
