import { ProductInterface, Prototype } from './shopping-cart-framework';

interface ShopInfo {
    name: string;
    email: string;
}

export class MyShopProduct implements ProductInterface, Prototype {
    protected code: any;
    protected description: any;

    constructor(protected productService: any, public shopInfo: ShopInfo) {
      this.productService = productService;
      this.shopInfo = shopInfo;
    }
    clone(): this {
      return Object.create(this);
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
