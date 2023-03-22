import { ProductMapper, Product, Manufacturer, DBRecord } from "./exercise";

describe('Mapper', () => {
    let mapper: ProductMapper;

    beforeEach(() => {
        mapper = new ProductMapper();
    });

    it('should create a new Product when using `toProduct`', () => {
        const testData: DBRecord = {
            name: "test product",
            price: 50,
            manufacturerName: "Test Widgets, Inc",
            manufacturerUrl: "http://testwidgets.test"
        };

        const product = mapper.toProduct(testData);

        expect(product).toBeInstanceOf(Product);
        expect(product.manufacturer).toBeInstanceOf(Manufacturer);
        expect(product.manufacturer.url).toBeInstanceOf(URL);
    });

    it('should create a raw object of correct shape when using `toDBData`', () => {
        const product = new Product('TestProduct', '120', new Manufacturer('Test Widgets, sp. o.o', new URL('https://testwidgets.co.test')));

        const dbRecord = mapper.toDBData(product);
        expect(dbRecord).toEqual({
            name: 'TestProduct',
            price: 120,
            manufacturerName: 'Test Widgets, sp. o.o',
            manufacturerUrl: 'https://testwidgets.co.test/'
        });
    });
});
