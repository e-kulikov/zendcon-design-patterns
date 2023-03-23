import { EmitterInterface, Emitter, EmitterDecorator } from "./emitter.class";
import { ObserverInterface, Observer, LoggerObserver } from "./observer.class";
import { Logger as RawLogger, Product as RawProduct } from "./exercise";

const logSpy = jest.spyOn(RawLogger.prototype, 'log');

const getProductSpy = jest.spyOn(RawProduct.prototype, 'getProduct');
const setProductSpy = jest.spyOn(RawProduct.prototype, 'setProduct');

@Observer.decorate('log')
class Logger extends RawLogger {}

@Emitter.decorate(['setProduct', 'getProduct'])
class Product extends RawProduct {
    /*getProduct(key: string): string {
        const result = super.getProduct(key);
        super.notify('getProduct', [key], result);

        return result;
    }

    setProduct(key: string, value: any) {
        const result = super.setProduct(key, value);

        super.notify('setProduct', [key, value], result);
        return result;
    }*/
}

describe('Observer', () => {
    let product: Product;

    beforeEach(() => {
        jest.resetAllMocks();

        product = new Product({});
    });

    it('should call target method of original class', () => {
        (product as unknown as EmitterInterface)
            .attach(new Logger('first') as unknown as ObserverInterface);

        product.setProduct('1', 111);
        product.getProduct('1');

        expect(setProductSpy).toHaveBeenCalledTimes(1);
        expect(setProductSpy).toHaveBeenCalledWith('1', 111);

        expect(getProductSpy).toHaveBeenCalledTimes(1);
        expect(getProductSpy).toHaveBeenCalledWith('1');
    });

    it('should call `log` method of original Logger on calling target method on observed class', () => {
        (product as unknown as EmitterInterface).attach(new Logger('first') as unknown as ObserverInterface);

        product.setProduct('1', 1);

        expect(logSpy).toHaveBeenCalledTimes(1);
        expect(logSpy).toHaveBeenCalledWith({
            event: 'setProduct',
            args: ['1', 1],
            result: undefined,
            instance: expect.any(Product)
        });
    });

    describe('using observer update', () => {
        it('should call `update` method of observer', () => {
            (product as unknown as EmitterInterface).attach(new Logger('first') as unknown as ObserverInterface);

            const updateSpy = jest.spyOn(Logger.prototype, 'update' as keyof Logger);

            product.setProduct('1', 1);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenCalledWith('setProduct', ['1', 1], undefined, expect.any(Product));
        });

        it('should stop calling `update` of observer after detaching', () => {
            const logger = new Logger('first') as unknown as ObserverInterface;
            (product as unknown as EmitterInterface).attach(logger);

            const updateSpy = jest.spyOn(Logger.prototype, 'update' as keyof Logger);

            product.setProduct('1', 1);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenLastCalledWith('setProduct', ['1', 1], undefined, expect.any(Product));

            (product as unknown as EmitterInterface).detach(logger);

            product.setProduct('2', 22);
            product.setProduct('3', 333);

            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(updateSpy).toHaveBeenLastCalledWith('setProduct', ['1', 1], undefined, expect.any(Product));
        });
    });
});
