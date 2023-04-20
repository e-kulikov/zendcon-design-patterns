import { SingleInputValue, MultipleInputValue, IntCaster, AscendingSort } from "./exercise";

describe('Visitor design pattern tests', () => {
    describe('IntCaster', () => {
        const intCaster = new IntCaster();
        const visitSingleInputValueSpy = jest.spyOn(intCaster, 'visitSingleInputValue');
        const visitMultipleInputValueSpy = jest.spyOn(intCaster, 'visitMultipleInputValue');

        describe('SingleInputValue', () => {
            let inputValue: SingleInputValue;

            beforeEach(() => {
                jest.clearAllMocks();

                inputValue = new SingleInputValue('3.14');
                inputValue.acceptVisitor(intCaster);
            });

            it('should cast a single input value to an integer', () => {
                expect(inputValue.get()).toBe(3);
            });

            it('should call visitSingleInputValue method', () => {
                expect(visitSingleInputValueSpy).toHaveBeenCalledTimes(1);
                expect(visitSingleInputValueSpy).toHaveBeenCalledWith(inputValue);
            });

            it('should not call visitMultipleInputValue method', () => {
                expect(visitMultipleInputValueSpy).not.toHaveBeenCalled();
            });
        });

        describe('MultipleInputValue', () => {
            let inputValue: MultipleInputValue;

            beforeEach(() => {
                jest.clearAllMocks();

                inputValue = new MultipleInputValue([5, '2.5', '10', 3.14]);
                inputValue.acceptVisitor(intCaster);
            });

            it('should cast multiple input values to integers', () => {
                expect(inputValue.get()).toEqual([5, 3, 10, 3]);
            });

            it('should call visitMultipleInputValue method', () => {
                expect(visitMultipleInputValueSpy).toHaveBeenCalledTimes(1);
                expect(visitMultipleInputValueSpy).toHaveBeenCalledWith(inputValue);
            });

            it('should not call visitSingleInputValue method', () => {
                expect(visitSingleInputValueSpy).not.toHaveBeenCalled();
            });
        });
    });

    describe('AscendingSort', () => {
        const ascendingSort = new AscendingSort();
        const visitSingleInputValueSpy = jest.spyOn(ascendingSort, 'visitSingleInputValue');
        const visitMultipleInputValueSpy = jest.spyOn(ascendingSort, 'visitMultipleInputValue');

        describe('SingleInputValue', () => {
            let inputValue: SingleInputValue;

            beforeEach(() => {
                jest.clearAllMocks();

                inputValue = new SingleInputValue(3.14);
                inputValue.acceptVisitor(ascendingSort);
            });

            it('should not change the value of a single input value', () => {
                expect(inputValue.get()).toBe(3.14);
            });

            it('should call visitSingleInputValue method', () => {
                expect(visitSingleInputValueSpy).toHaveBeenCalledTimes(1);
                expect(visitSingleInputValueSpy).toHaveBeenCalledWith(inputValue);
            });

            it('should not call visitMultipleInputValue method', () => {
                expect(visitMultipleInputValueSpy).not.toHaveBeenCalled();
            });
        });

        describe('MultipleInputValue', () => {
            let inputValue: MultipleInputValue;

            beforeEach(() => {
                jest.clearAllMocks();

                inputValue = new MultipleInputValue(['orange', 'apple', 17, 'banana', 'apricot']);
                inputValue.acceptVisitor(ascendingSort);
            });

            it('should sort the values of a multiple input value in ascending order', () => {
                expect(inputValue.get()).toEqual([17, 'apple', 'apricot', 'banana', 'orange']);
            });

            it('should call visitMultipleInputValue method', () => {
                expect(visitMultipleInputValueSpy).toHaveBeenCalledTimes(1);
                expect(visitMultipleInputValueSpy).toHaveBeenCalledWith(inputValue);
            });

            it('should not call visitSingleInputValue method', () => {
                expect(visitSingleInputValueSpy).not.toHaveBeenCalled();
            });
        });
    });
});
