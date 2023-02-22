export class Shop {
    constructor(protected shopFactory: ShopFactoryInterface) {}
    listProductsWithShippingCost(codes: string[], shippingMethodName: string, miles: number) {
        return codes.reduce((output, code) => {
            const product = this.shopFactory.createProduct(code);
            const shippingMethod = this.shopFactory.createShippingMethod(shippingMethodName);

            return `${output}${output && '\n'}` +
                `${product.productCode} - ` +
                `${product.productDescription} / via: ` +
                `${shippingMethod.courierName}, cost: ` +
                `\$${shippingMethod.getCostEstimate(miles, product)}`;
        }, '');
    }
}

export interface ProductData {
    [id: string]: [string, number]
}
export interface ShippingMethodData {
    [name: string]: [number, number]
}
export interface ShopFactoryInterface {
    createProduct(productCode: keyof ProductData): ProductInterface;
    createShippingMethod(name: keyof ShippingMethodData): ShippingMethodInterface;
}
export interface ProductInterface {
    get productCode(): keyof ProductData;
    get productDescription(): ProductData[keyof ProductData][0];
}
export interface ShippingMethodInterface {
    get courierName(): keyof ShippingMethodData;
    getCostEstimate(miles: number, product: ProductInterface): number;
}
