// import { EmitterDecorator } from "./emitter.class";
// import { LoggerObserver } from "./observer.class";

export class Product /*extends EmitterDecorator<typeof Product>*/ {
    constructor(private data: Record<string, any>) {
        // super();
    }

    getProduct(key: string): string {
        return this.data[key];
    }

    setProduct(key: string, value: any): void {
        this.data[key] = value;
    }
}

export class Logger /*extends LoggerObserver*/ {
    constructor(private prefix: string) {
        // super();
    }

    log(eventObj: unknown) {
        console.log(this.prefix, eventObj);
    }
}
