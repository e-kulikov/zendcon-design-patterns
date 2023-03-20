import { ProductCreator, ProductInterface } from './shopping-cart-framework'
export class ProductCatalogA extends ProductCreator {
    constructor(private db: ProductCatalogDB) {
        super();
    }
    createProduct(productCode: string): MyShopProduct {
        return new MyShopProduct(productCode, this.db[productCode]);
    }
}

interface ProductCatalogDB {
    [code: string]: string
}

export class MyShopProduct implements ProductInterface {
    constructor(protected code: string, protected description: string) {}
    getShopProductCode() {
        return this.code;
    }
    getShopDescription() {
        return this.description;
    }
}
