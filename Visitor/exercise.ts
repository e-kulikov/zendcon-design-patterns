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
    // @todo here the code to implement
    acceptVisitor(visitor: Visitor): void {
        visitor.visitSingleInputValue(this)
    }
}

export class MultipleInputValue extends InputValue<(string | number)[]> {
    // @todo here the code to implement
    acceptVisitor(visitor: Visitor): void {
        visitor.visitMultipleInputValue(this);
    }
}

export interface Visitor {
    visitSingleInputValue(inputValue: SingleInputValue): void;
    visitMultipleInputValue(inputValue: MultipleInputValue): void;
}

export class IntCaster implements Visitor {
    // @todo here the code to implement
    visitSingleInputValue(inputValue: SingleInputValue): void {
        inputValue.set(Math.round(Number(inputValue.get())));
    }
    visitMultipleInputValue(inputValue: MultipleInputValue): void {
        const newValues = [];
        for(const index in inputValue.get()) {
            newValues.push(Math.round(inputValue.get()[index] as number));
        }
        inputValue.set(newValues);
    }
}

export class AscendingSort implements Visitor {
    // @todo here the code to implement
    visitSingleInputValue(inputValue: SingleInputValue): void {
    }
    visitMultipleInputValue(inputValue: MultipleInputValue): void {
        inputValue.set(inputValue.get().sort());
    }
}
