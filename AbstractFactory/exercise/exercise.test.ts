import { ProductData, ShippingMethodData, Shop } from "./shopping-cart-framework";
import { MyShopProductFactory, MyShopProduct, MyShippingMethod } from "./my-company-shop";

const getProductCodeSpy = jest.spyOn(MyShopProduct.prototype, 'productCode', 'get');
const getProductDescriptionSpy = jest.spyOn(MyShopProduct.prototype, 'productDescription', 'get');
const getProductWeightSpy = jest.spyOn(MyShopProduct.prototype, 'productWeight', 'get');

const getCourierNameSpy = jest.spyOn(MyShippingMethod.prototype, 'courierName', 'get');
const getCostEstimateSpy = jest.spyOn(MyShippingMethod.prototype, 'getCostEstimate');

const TEST_PRODUCT_DATA: ProductData = {
    'BumperSticker1': ['Bumper Sticker Item #1', 1],
    'BumperSticker3': ['Bumper Sticker Item #3', 1],
    'BumperSticker5': ['Bumper Sticker Item #5', 1],
    'CoffeeTableBook6': ['Coffee Table Book Item #6 (500 pages)', 5],
    'CoffeeTableBook7': ['Coffee Table Book Item #7 (300 pages)', 3],
    'CoffeeTableBook9': ['Coffee Table Book Item #9 (900 pages)', 9],
};

const TEST_SHIPPING_METHOD_DATA: ShippingMethodData = {
    'UPS': [1.4, 1.1],
    'FEDEX': [2.2, 1.3],
};
describe('AbstractFactory', () => {
    let factory: MyShopProductFactory;
    let shop: Shop;

    beforeEach(() => {
        factory = new MyShopProductFactory(TEST_PRODUCT_DATA, TEST_SHIPPING_METHOD_DATA);
        shop = new Shop(factory);

        jest.clearAllMocks();
    });

    it('should create MyShop Product & ShippingMethod', () => {
        shop.listProductsWithShippingCost(
            ['BumperSticker1', 'CoffeeTableBook6'],
            'UPS',
            10)

        const product = factory.createProduct('CoffeeTableBook6');
        const shippingMethod = factory.createShippingMethod('FEDEX');

        expect(product).toBeInstanceOf(MyShopProduct);
        expect(shippingMethod).toBeInstanceOf(MyShippingMethod);
    });

    it('should return correct output', () => {
        expect(
            shop.listProductsWithShippingCost(
                ['BumperSticker1', 'CoffeeTableBook6'],
                'UPS',
                10)
        ).toEqual(
            `BumperSticker1 - Bumper Sticker Item #1 / via: UPS, cost: $15.1\nCoffeeTableBook6 - Coffee Table Book Item #6 (500 pages) / via: UPS, cost: $19.5`)
    });

    it('should call proper class methods for each product', () => {
        const TEST_CODES = Object.keys(TEST_PRODUCT_DATA);

        // getting random codes
        const CODES = TEST_CODES
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * TEST_CODES.length));

        const MILES = Math.random();

        shop.listProductsWithShippingCost(
            CODES,
            'UPS',
            MILES);

        expect(getProductCodeSpy).toHaveBeenCalledTimes(CODES.length);
        expect(getProductDescriptionSpy).toHaveBeenCalledTimes(CODES.length);
        expect(getProductWeightSpy).toHaveBeenCalledTimes(CODES.length);

        expect(getCourierNameSpy).toHaveBeenCalledTimes(CODES.length);
        expect(getCostEstimateSpy).toHaveBeenCalledTimes(CODES.length);
        expect(getCostEstimateSpy).toHaveBeenLastCalledWith(MILES, expect.any(MyShopProduct));
    });
});
