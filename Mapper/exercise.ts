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
    toProduct({ name, price, manufacturerName, manufacturerUrl }: DBRecord): Product {
        const manufacturer = new Manufacturer(manufacturerName, new URL(manufacturerUrl));
        return new Product(name, price.toString(), manufacturer);
    }

    toDBData(product: Product): DBRecord {
        const {
            name,
            price,
            manufacturer: {
                name: manufacturerName,
                url: manufacturerUrl
            }
        } = product;
        return {
            name, price: +price, manufacturerName, manufacturerUrl: manufacturerUrl.toString()
        }
    }
}
