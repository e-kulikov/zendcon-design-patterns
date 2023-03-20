import { Shop, ProductCreator } from "./shopping-cart-framework";
import { ProductCatalogA, MyShopProduct } from "./my-company-shop";

const db = require('./product-catalog-a.json');

describe('FactoryMethodA', () => {
    let shop: Shop;
    beforeEach(() => {
        shop = new Shop(new ProductCatalogA(db));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return correct response', () => {
        expect(
            shop.listProducts(Object.keys(db))
        ).toEqual(
            Object.entries(db)
                .map(([code, description]) => `${code} - ${description}`)
                .join('\n')
        );
    });

    it('should create a product for each provided code', () => {
        const codes = Object.keys(db);

        const createProductMock = jest.spyOn(ProductCatalogA.prototype, 'createProduct');

        shop.listProducts(codes);

        expect(createProductMock).toHaveBeenCalledTimes(codes.length);
    });

    it('should call business logic of creator class', () => {
        const codes = Object.keys(db);

        const getMarketingDescriptionMock = jest.spyOn(ProductCreator.prototype, 'getMarketingDescription');

        shop.listProducts(codes);

        expect(getMarketingDescriptionMock).toHaveBeenCalledTimes(codes.length);
    });

    it('should call product methods for each provided code', () => {
        const codes = Object.keys(db);

        const getShopProductCodeMock = jest.spyOn(MyShopProduct.prototype, 'getShopProductCode');
        const getShopDescriptionMock = jest.spyOn(MyShopProduct.prototype, 'getShopDescription');

        shop.listProducts(codes);

        expect(getShopProductCodeMock).toHaveBeenCalledTimes(codes.length);
        expect(getShopDescriptionMock).toHaveBeenCalledTimes(codes.length);
    });
});
