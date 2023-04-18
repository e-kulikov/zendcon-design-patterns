import { ProductInterface, Prototype } from './shopping-cart-framework';

interface ShopInfo {
    name: string;
    email: string;
}

export class MyShopProduct implements ProductInterface, Prototype {
    protected code: any;
    protected description: any;

    constructor(protected productService: any, public shopInfo: ShopInfo) {}

    clone(): this {
        const cloned = Object.create(this);
        cloned.shopInfo = Object.assign({}, this.shopInfo);
        return cloned;
    }

    initialize(code: any): void {
        this.code = code;
        this.description = this.productService(code);
    }

    getShopProductCode(): string {
        return this.code;
    }

    getShopDescription(): string {
        return this.description;
    }
}
