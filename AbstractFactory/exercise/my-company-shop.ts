import {
    ProductData,
    ProductInterface,
    ShippingMethodData,
    ShippingMethodInterface,
    ShopFactoryInterface
} from "./shopping-cart-framework";

export class MyShopProductFactory implements ShopFactoryInterface {
    constructor(
        protected productData: ProductData,
        public shippingMethodData: ShippingMethodData
    ) {}
    createProduct(productCode: string) {
        return new MyShopProduct(
            productCode, this.productData[productCode]
        );
    }
    createShippingMethod(name: string) {
        return new MyShippingMethod(name, this.shippingMethodData[name]);
    }
}

export class MyShopProduct implements ProductInterface {
    constructor(
        protected code: keyof ProductData,
        protected descriptionAndWeight: ProductData[keyof ProductData]
    ) {}
    get productCode() {
        return this.code;
    }
    get productDescription() {
        return this.descriptionAndWeight[0];
    }
    get productWeight() {
        return this.descriptionAndWeight[1];
    }
}

export class MyShippingMethod implements ShippingMethodInterface {
    constructor(
        protected name: keyof ShippingMethodData,
        protected multipliers: ShippingMethodData[keyof ShippingMethodData]
    ) {}
    get courierName() {
        return this.name;
    }
    getCostEstimate(miles: number, product: MyShopProduct) {
        return (this.multipliers[0] * miles) + (this.multipliers[1] * product.productWeight);
    }
}
