import { MyShopProduct } from './my-company-shop';
import { Shop } from "./shopping-cart-framework";

describe('Prototype', () => {
    const productService = (code: any) => `Product ${code}`;
    const originalShopInfo = {
        name: 'My Shop',
        email: 'myshop@example.com'
    };

    const product = new MyShopProduct(productService, originalShopInfo);
    const shop = new Shop(product);

    const cloneSpy = jest.spyOn(product, 'clone')
    const initializeSpy = jest.spyOn(product, 'initialize');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should clone the instance and create a deep copy of the shop info', () => {
        const clonedProduct = product.clone();
        expect(clonedProduct).not.toBe(product);

        expect(clonedProduct).toBeInstanceOf(MyShopProduct);

        expect(clonedProduct.shopInfo).toEqual(originalShopInfo);
        expect(clonedProduct.shopInfo).not.toBe(originalShopInfo);
    });

    it('should initialize the instance with the given product code', () => {
        const product = new MyShopProduct(productService, originalShopInfo);
        const code = '123';

        product.initialize(code);
        expect(product.getShopProductCode()).toBe(code);
        expect(product.getShopDescription()).toBe(productService(code));
    });

    it('should list the products for the given codes', () => {
        const codes = ['123', '456', '789'];
        const expectedOutput = '123 - Product 123\n456 - Product 456\n789 - Product 789';

        const output = shop.listProducts(codes);

        expect(cloneSpy).toHaveBeenCalledTimes(codes.length);
        expect(initializeSpy).toHaveBeenCalledTimes(codes.length);

        expect(output).toBe(expectedOutput);
    });
});
