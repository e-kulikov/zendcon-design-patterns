export class PayPal {
   constructor(private email: string, private password: string) {}

    transfer(email: string, amount: number) {
        // validation process is omitted for simplicity
        return 'Paypal: success!';
    }
}

export class CreditCard {
    constructor(private number: string, private expiration: string) {}

    authorizeTransaction(amount: number) {
        // validation process is omitted for simplicity
        return 'Authorization: success';
    }
}

interface Product {
    id: number;
    price: number;
    value: string;
}
export class Merchant {
    private goods: Product[] = [
        {
            id: 1,
            price: 100,
            value: 'product'
        }
    ];
    constructor(protected payment: PaymentInterface) {}

    sell(productId: number): string {
        const product = this.goods.find(({id}) => id === productId);
        if (!product) throw Error('Product not found');

        if (this.payment.collectMoney(product.price)) return product.value;
        throw Error('Payment failed');
    }
}

interface PaymentInterface {
    collectMoney(amount: number): boolean;
}

export class CreditCardAdapter implements PaymentInterface {
    constructor(private creditCard: CreditCard) {}

    collectMoney(amount: number): boolean {
        return this.creditCard.authorizeTransaction(amount) === 'Authorization: success';
    }
}

export class PayPalAdapter implements PaymentInterface {
    constructor(private paypal: PayPal) {}

    collectMoney(amount: number): boolean {
        return this.paypal.transfer('payments@merchant.shop', amount) === 'Paypal: success!';
    }
}
