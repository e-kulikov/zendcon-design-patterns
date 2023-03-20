export class Fibonacci implements Iterable<number> {
    constructor(private length: number) {}

    [Symbol.iterator](): Iterator<number> {
      let current = 0;
      let prev = 0;
      let index = 0;

      return {
        next: (): IteratorResult<number> => {
          if (index++ < this.length) {
            [prev, current] = [current, (prev + current) || 1];
            return { value: prev, done: false };
          } else {
            return { value: undefined, done: true };
          }
        }
      };
    }
  }

