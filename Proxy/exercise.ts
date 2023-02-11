interface ImageInterface {
    display(): void;
}

class Image implements ImageInterface {
    protected filename;
    constructor(filename) {
        this.filename = filename;
        this.loadFromDisk();
    }
    loadFromDisk() {
        console.log(`Loading ${this.filename}`);
    }
    display() {
        console.log(`Display ${this.filename}`);
    }
}

class ProxyImage implements ImageInterface {
    protected image;

    // @todo here the code to implement
    
    protected cachedImage: any;
    protected filename: any;

    constructor(image: any) {
        this.image = image;
        this.filename = filename;
        this.loadFromDisk();
    }
    loadFromDisk() {
        console.log(`Loading ${this.filename}`);
    }

    display(): void {
        if (this.cachedImage === null) {
            this.loadFromDisk();
            this.cachedImage = this.image;
        }
        console.log(`Display ${this.filename}`);
    }
}

// Usage example

const filename = 'test.png';

const image1 = new Image(filename); // loading necessary
image1.display(); // loading unnecessary

const image2 = new ProxyImage(filename); // loading unnecessary
image2.display(); // loading necessary
image2.display(); // loading unnecessary
