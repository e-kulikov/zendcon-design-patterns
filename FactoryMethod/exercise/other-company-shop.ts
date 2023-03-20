import { ProductCreator, ProductInterface } from './shopping-cart-framework'
export class ProductCatalogB extends ProductCreator {
    constructor(private db: ProductCatalogBDB) {
        super();
    }
    createProduct(productCode: string): MyShopProduct {
        return new MyShopProduct(productCode, ...this.db[productCode]);
    }

    getMarketingDescription(productCode: string): string {
        const product = this.createProduct(productCode);
        return `${product.getShopProductModel()} ${product.getShopProductCode()}: ${product.getShopDescription()}`
    }
}

export interface ProductCatalogBDB {
    [code: string]: [string, string]
}

export class MyShopProduct implements ProductInterface {
    constructor(protected code: string, protected description: string, protected model: string) {}

    getShopProductModel() {
        return this.model;
    }
    getShopProductCode() {
        return this.code;
    }
    getShopDescription() {
        return this.description;
    }
}
