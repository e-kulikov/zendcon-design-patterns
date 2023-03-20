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

export class UsersManager<T> {}

export class ProductsListManager<T> {}
