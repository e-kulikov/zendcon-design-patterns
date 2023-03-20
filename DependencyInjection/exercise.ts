import { v4 as uuid } from 'uuid';

type DBInitialRecord<T> =
    T extends Record<string, unknown> ?
        T extends { _id: any } ?
            never :
            T :
        never;

type DBIndexType = string;

type DBRecord<T> = T & { _id: DBIndexType };

export class Database<T> {
    protected state: DBRecord<T>[];
    constructor(initialState: DBInitialRecord<T>[]) {
        this.state = initialState.reduce<DBRecord<T>[]>(
            (state, item) => {
                return [ ...state, { _id: uuid(), ...item }];
            },
            []
        );
    }

    getByID(id: DBIndexType): T | null {
        return this.state.find(({_id}) => _id === id) || null;
    }

    setByID(id: DBIndexType, item: T): void | never {
        const index = this.state.findIndex(({_id}) => _id === id) || null;
        if (index !== null) {
            this.state[index] = {...item, _id: id};
            return;
        }

        throw Error('Invalid ID');
    }

    addNewRecord(item: T): DBIndexType {
        const _id = uuid();
        this.state.push({...item, _id});
        return _id;
    }
}

export class UsersManager<T> {
    constructor(protected db: Database<T>) {}

    search(id: DBIndexType): string {
        const data = this.db.getByID(id);
        if (data !== null) {
            return `User ID ${id}: ${JSON.stringify(data)}`;
        } else {
            return `Sorry, there is no records for this ID`;
        }
    }

    replace(id: DBIndexType, userData: T): string {
        try {
            this.db.setByID(id, userData);
            return `User data replaced successfully`;
        } catch (e) {
            return `There is an error during replacement: ${e}`;
        }
    }

    addNewUser(userData: T): string {
        const id = this.db.addNewRecord(userData);
        return `A new user added. User ID: ${id}`;
    }
}

export class ProductsListManager<T> {
    constructor(protected db: Database<T>) {}

    getItem(id: DBIndexType) {
        return this.db.getByID(id);
    }

    replaceItem(id: DBIndexType, item: T) {
        this.db.setByID(id, item);
    }

    addItem(item: T) {
        return { _id: this.db.addNewRecord(item) };
    }
}
