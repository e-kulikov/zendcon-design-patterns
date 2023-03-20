export class Fibonacci implements Iterable<number> {
    constructor(private length: number) {}

    [Symbol.iterator](): Iterator<number> {
      let current = 0;
      let next = 1;
      let index = 0;

      return {
        next: (): IteratorResult<number> => {
          if (index < this.length) {
            const value = current;
            [current, next] = [next, current + next];
            index++;
            return { value, done: false };
          } else {
            return { value: null as any, done: true };
          }
        }
      };
    }
  }

