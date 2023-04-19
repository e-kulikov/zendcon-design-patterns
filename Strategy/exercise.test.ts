import {
    Product,
    ProductCollection,
    ProductFilteringStrategy,
    ManufacturerFilter,
    MaxPriceFilter,
} from './exercise';

const collectionFilterSpy = jest.spyOn(ProductCollection.prototype, 'filter');

const products: Product[] = [
    new Product('Product 1', 200, 0.2, 'Manufacturer 1'),
    new Product('Product 2', 100, 0.5, 'Manufacturer 1'),
    new Product('Product 3', 150, 0.1, 'Manufacturer 2'),
    new Product('Product 4', 30, undefined,'Manufacturer 3'),
];

const collection = new ProductCollection(products);

describe('Strategy', () => {
    afterAll(() => {
        jest.resetAllMocks();
    });

    describe('MaxPriceFilter', () => {
        const strategy: ProductFilteringStrategy = new MaxPriceFilter(50);
        const strategyFilterSpy = jest.spyOn(strategy, 'filter');
        const filtered = collection.filter(strategy).getProductsArray();

        it('should filter correctly', () => {
            expect(filtered).toHaveLength(2);
            expect(filtered.map(({ name }) => name)).toEqual(['Product 2', 'Product 4']);
        });

        it('should call target strategy `filter` method correctly', () => {
            expect(strategyFilterSpy).toHaveBeenCalledTimes(products.length);

            strategyFilterSpy.mock.calls.forEach(([product], index) => {
                expect(product).toBe(products[index]);
            });
        });
    });

    describe('ManufacturerFilter', () => {
        const strategy: ProductFilteringStrategy = new ManufacturerFilter('Manufacturer 2');
        const strategyFilterSpy = jest.spyOn(strategy, 'filter');
        const filtered = collection.filter(strategy).getProductsArray();

        it('should filter correctly', () => {
            expect(filtered).toHaveLength(1);
            expect(filtered.map(({ name }) => name)).toEqual(['Product 3']);
        });

        it('should call target strategy `filter` method correctly', () => {
            expect(strategyFilterSpy).toHaveBeenCalledTimes(products.length);

            strategyFilterSpy.mock.calls.forEach(([product], index) => {
                expect(product).toBe(products[index]);
            });
        });
    });

    it('should not call product collection `filter` method recursively', () => {
        expect(collectionFilterSpy).toHaveBeenCalledTimes(2);

        expect(collectionFilterSpy.mock.calls[0][0]).toBeInstanceOf(MaxPriceFilter);
        expect(collectionFilterSpy.mock.calls[1][0]).toBeInstanceOf(ManufacturerFilter);
    });

    it('should not modify original collection', () => {
        expect(products).toEqual([
            new Product('Product 1', 200, 0.2, 'Manufacturer 1'),
            new Product('Product 2', 100, 0.5, 'Manufacturer 1'),
            new Product('Product 3', 150, 0.1, 'Manufacturer 2'),
            new Product('Product 4', 30, undefined,'Manufacturer 3'),

        ]);
    });
});
