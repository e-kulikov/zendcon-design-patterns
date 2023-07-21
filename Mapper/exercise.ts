export class Product {
    constructor(
        public name: string,
        public price: string,
        public manufacturer: Manufacturer
    ) {}
}

export class Manufacturer {
    constructor(
        public name: string,
        public url: URL
    ) {}
}

export interface DBRecord {
    name: string;
    price: number;
    manufacturerName: string;
    manufacturerUrl: string;
}

export class ProductMapper {
    // @todo: here the code to implement
    public toProduct(testData: DBRecord): Product {
        return new Product(
            testData.name,
            `${testData.price}`,
            new Manufacturer(
                testData.manufacturerName,
                new URL(testData.manufacturerUrl)
            )
        )
    }
    public toDBData(product: Product){
        return {
            name: product.name,
            price: Number(product.price),
            manufacturerName: product.manufacturer.name, 
            manufacturerUrl: product.manufacturer.url.href
        } 
    }
}
