interface ImageInterface {
    display(): string;
}

export class CustomImage implements ImageInterface {
    protected filename: string;
    constructor(filename: string) {
        this.filename = filename;
        this.loadFromDisk();
    }
    loadFromDisk() {
        console.log(`Loading ${this.filename}`);
    }
    display() {
        return `Display ${this.filename}`;
    }
}

export class ProxyImage implements ImageInterface {
    protected image?: ImageInterface;
    constructor(protected filename: any) {}

    display() {
        if (!this.image) {
            this.image = new CustomImage(this.filename);
        }
        return this.image.display();
    }
}
