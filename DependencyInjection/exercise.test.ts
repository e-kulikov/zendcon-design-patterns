import { Database, UsersManager, ProductsListManager } from "./exercise";
const { users, products } = require('./test_data.json');

describe('DependencyInjection', () => {
    const userDB = new Database(users);
    const productsDB = new Database(products);

    const getUserByIDSpy = jest.spyOn(userDB, 'getByID');
    const replaceUserByIDSpy = jest.spyOn(userDB, 'setByID');
    const addNewUserSpy = jest.spyOn(userDB, 'addNewRecord');

    const getProductByIDSpy = jest.spyOn(productsDB, 'getByID');
    const replaceProductByIDSpy = jest.spyOn(productsDB, 'setByID');
    const addNewProductSpy = jest.spyOn(productsDB, 'addNewRecord');

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    describe('UsersManager', () => {
        const usersManager = new UsersManager(userDB);

        it('should return correct response during search', () => {
            const testID = users[0]._id;
            const result = usersManager.search(testID);

            expect(result).toEqual(`User ID ${testID}: ${JSON.stringify(users[0])}`);
        });

        it('should call appropriate db method', () => {
            usersManager.search('test-id');
            expect(getUserByIDSpy).toHaveBeenCalledTimes(1);
            expect(getUserByIDSpy).toHaveBeenCalledWith('test-id');
        });

        it('should not call other db method', () => {
            usersManager.search('test-id');
            expect(getProductByIDSpy).not.toHaveBeenCalled();
        });
    });

    describe('ProductsListManager', () => {
        const productsManager = new ProductsListManager(productsDB);

        const testItem1 = {"title":"Pizza","amount":2,"price":5.67};
        const testItem2 = {"title":"Pizza","amount":3,"price":9.87};

        it('should generate id for added item', () => {
            const { _id } = productsManager.addItem(testItem1);
            const insertedData = productsManager.getItem(_id);

            expect(insertedData).toEqual({ ...testItem1, _id });
        });

        it('should call only appropriate db method', () => {
            productsManager.addItem(testItem2);

            expect(addNewProductSpy).toHaveBeenCalledTimes(1);
            expect(addNewProductSpy).toHaveBeenCalledWith(testItem1);

            expect(addNewUserSpy).not.toHaveBeenCalled();
        });
    });
});
