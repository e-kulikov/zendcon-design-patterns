export class Product {
    constructor(private data: Record<string, any>) {}

    getProduct(key: string): string {
        return this.data[key];
    }

    setProduct(key: string, value: any): void {
        this.data[key] = value;
    }
}

export class Logger {
    constructor(private prefix: string) {}

    log(eventObj: unknown) {
        console.log(this.prefix, eventObj);
    }
}
