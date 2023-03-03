export class Fibonacci implements IterableIterator<number> {
  protected lenght: number;
  protected a: number;
  protected b: number;
  constructor(length: number) {
    this.lenght = length;
    this.a = 0;
    this.b = 1;
  }
  [Symbol.iterator](): IterableIterator<number> {
    return this;
  }
  next(): IteratorResult<number, any> {
    if (this.lenght > 0) {
      const result = { value: this.a, done: false };
      this.lenght--;
      const temp = this.b;
      this.b = this.a + this.b;
      this.a = temp;
      return result;
    }
    return { value: this.a, done: true };
  }
}
