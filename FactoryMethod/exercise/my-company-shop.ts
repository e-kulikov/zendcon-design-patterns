import { ProductCreator, ProductInterface } from "./shopping-cart-framework";
export class ProductCatalogA extends ProductCreator {
  private catalog: ProductCatalogDB;
  public constructor(catalog: ProductCatalogDB) {
    super();
    this.catalog = catalog;
  }
  public createProduct(code: string): ProductInterface {
    return new MyShopProduct(code, this.catalog[code]);
  }

  getMarketingDescription(code: string): string {
    const product = this.createProduct(code);
    return `${product.getShopProductCode()} - ${product.getShopDescription()}`;
  }
}

interface ProductCatalogDB {
  [code: string]: string;
}

export class MyShopProduct implements ProductInterface {
  private code: string;
  private description: string;
  public constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
  }
  getShopProductCode(): string {
    return this.code;
  }
  getShopDescription(): string {
    return this.description;
  }
}
