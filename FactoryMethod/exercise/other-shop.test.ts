import { Shop, ProductCreator } from "./shopping-cart-framework";
import { ProductCatalogB, MyShopProduct, ProductCatalogBDB } from "./other-company-shop";

const db: ProductCatalogBDB = require('./product-catalog-b.json');

describe('FactoryMethodB', () => {
    let shop: Shop;
    beforeEach(() => {
        shop = new Shop(new ProductCatalogB(db));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return correct response', () => {
        expect(
            shop.listProducts(Object.keys(db))
        ).toEqual(
            Object.entries(db)
                .map(([code, [description, make]]) => `${make} ${code}: ${description}`)
                .join('\n')
        );
    });

    it('should create a product for each provided code', () => {
        const codes = Object.keys(db);

        const createProductMock = jest.spyOn(ProductCatalogB.prototype, 'createProduct');

        shop.listProducts(codes);

        expect(createProductMock).toHaveBeenCalledTimes(codes.length);
    });

    it('should NOT call business logic of creator class', () => {
        const codes = Object.keys(db);

        const getMarketingDescriptionMock = jest.spyOn(ProductCreator.prototype, 'getMarketingDescription');

        shop.listProducts(codes);

        expect(getMarketingDescriptionMock).not.toHaveBeenCalled();
    });

    it('should call business logic of product class', () => {
        const codes = Object.keys(db);

        const getMarketingDescriptionMock = jest.spyOn(ProductCatalogB.prototype, 'getMarketingDescription');

        shop.listProducts(codes);

        expect(getMarketingDescriptionMock).toHaveBeenCalledTimes(codes.length);
    });

    it('should call product methods for each provided code', () => {
        const codes = Object.keys(db);

        const getShopProductCodeMock = jest.spyOn(MyShopProduct.prototype, 'getShopProductCode');
        const getShopDescriptionMock = jest.spyOn(MyShopProduct.prototype, 'getShopDescription');
        const getShopProductModelMock = jest.spyOn(MyShopProduct.prototype, 'getShopProductModel');

        shop.listProducts(codes);

        expect(getShopProductCodeMock).toHaveBeenCalledTimes(codes.length);
        expect(getShopDescriptionMock).toHaveBeenCalledTimes(codes.length);
        expect(getShopProductModelMock).toHaveBeenCalledTimes(codes.length);
    });
});
