 export class Shop {
    constructor(protected product: ProductCreator ) {}
    listProducts(codes: string[]) {
        return codes.reduce((output: string, code: string) => {
            return `${output}${output && '\n'}${this.product.getMarketingDescription(code)}`
        }, '');
    }
}

export abstract class ProductCreator {
    public abstract createProduct(code: string): ProductInterface;

    getMarketingDescription(code: string): string {
        const product = this.createProduct(code);
        return `${product.getShopProductCode()} - ${product.getShopDescription()}`;
    }
}
export interface ProductInterface {
    getShopProductCode(): string;
    getShopDescription(): string;
}
