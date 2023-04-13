import { ProductCreator, ProductInterface } from "./shopping-cart-framework";
export class ProductCatalogB extends ProductCreator {
  private catalog: ProductCatalogBDB;
  public constructor(catalog: ProductCatalogBDB) {
    super();
    this.catalog = catalog;
  }
  public createProduct(code: string): ProductInterface {
    return new MyShopProduct(code, this.catalog[code]);
  }

  getMarketingDescription(code: string): string {
    const product = this.createProduct(code);
    return `${product.getShopProductModel()} ${product.getShopProductCode()}: ${product.getShopDescription()}`;
  }
}

export interface ProductCatalogBDB {
  [code: string]: [string, string];
}

export class MyShopProduct implements ProductInterface {
  private code: string;
  private description: [string, string];
  public constructor(code: string, description: [string, string]) {
    this.code = code;
    this.description = description;
  }
  getShopProductCode(): string {
    return this.code;
  }
  getShopDescription(): string {
    return this.description[0];
  }
  getShopProductModel(): string {
    return this.description[1];
  }
}
