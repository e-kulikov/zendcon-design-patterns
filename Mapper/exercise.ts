export class Product {
  constructor(
    public name: string,
    public price: string,
    public manufacturer: Manufacturer
  ) {}
}

export class Manufacturer {
  constructor(public name: string, public url: URL) {}
}

export interface DBRecord {
  name: string;
  price: number;
  manufacturerName: string;
  manufacturerUrl: string;
}

export class ProductMapper {
  toProduct(dbrecord: DBRecord) {
    return new Product(
      dbrecord.name,
      dbrecord.price.toString(),
      new Manufacturer(
        dbrecord.manufacturerName,
        new URL(dbrecord.manufacturerUrl)
      )
    );
  }

  toDBData(product: Product) {
    return {
      name: product.name,
      price: Number(product.price),
      manufacturerName: product.manufacturer.name,
      manufacturerUrl: product.manufacturer.url.toString(),
    } as DBRecord;
  }
}
