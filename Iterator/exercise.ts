export class Fibonacci implements Iterable<number> {
    private current: number = 0;
    private prev: number = 0;
    private index: number = 0;
    constructor(private length: number) {}

    next(): IteratorResult<number> {
        if (this.index++ < this.length) {
            [this.prev, this.current] = [this.current, (this.prev + this.current) || 1];
            return { value: this.prev, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}
