abstract class InputValue<T = unknown> {
    constructor(private value: T) {}

    set(value: T): void {
        this.value = value;
    }

    get(): T {
        return this.value;
    }

    abstract acceptVisitor(visitor: Visitor): void;
}

export class SingleInputValue extends InputValue<string | number> {
    acceptVisitor(visitor: Visitor): void {
        visitor.visitSingleInputValue(this);
    }
}

export class MultipleInputValue extends InputValue<(string | number)[]> {
    acceptVisitor(visitor: Visitor): void {
        visitor.visitMultipleInputValue(this);
    }
}

export interface Visitor {
    visitSingleInputValue(inputValue: SingleInputValue): void;
    visitMultipleInputValue(inputValue: MultipleInputValue): void;
}

export class IntCaster implements Visitor {
    visitSingleInputValue(inputValue: SingleInputValue): void {
        inputValue.set(Math.round(+inputValue.get()));
    }

    visitMultipleInputValue(inputValue: MultipleInputValue): void {
        const newValues: number[] = [];
        for (const value of inputValue.get()) {
            newValues.push(Math.round(+value));
        }
        inputValue.set(newValues);
    }
}

export class AscendingSort implements Visitor {
    visitSingleInputValue(inputValue: SingleInputValue): void {}

    visitMultipleInputValue(inputValue: MultipleInputValue): void {
        const values = [...inputValue.get()];

        values.sort((a, b) => {
            if (typeof a === "number" && typeof b === "number") {
                return a - b;
            } else if (typeof a === "number") {
                return -1;
            } else if (typeof b === "number") {
                return 1;
            } else {
                return a.localeCompare(b);
            }
        });
        inputValue.set(values);
    }
}
