export class Product {
    constructor(
        public name: string,
        public listPrice: number,
        public discountPercent?: number,
        public manufacturer?: string
    ) {}
}

export class ProductCollection {
    private readonly products: Product[];

    constructor(products: Product[]) {
        this.products = products;
    }

    filter(filterStrategy: ProductFilteringStrategy): ProductCollection {
        const filteredProducts: Product[] = [];
        for (const product of this.products) {
            if (filterStrategy.filter(product)) {
                filteredProducts.push(product);
            }
        }
        return new ProductCollection(filteredProducts);
    }

    getProductsArray(): Product[] {
        return this.products;
    }
}

export interface ProductFilteringStrategy {
    filter(product: Product): boolean;
}

export class ManufacturerFilter implements ProductFilteringStrategy {
    private readonly manufacturerName: string;

    constructor(manufacturerName: string) {
        this.manufacturerName = manufacturerName;
    }

    filter(product: Product): boolean {
        return product.manufacturer === this.manufacturerName;
    }
}

export class MaxPriceFilter implements ProductFilteringStrategy {
    private readonly maxDiscount: number;

    constructor(maxDiscount: number) {
        this.maxDiscount = maxDiscount;
    }

    filter(product: Product): boolean {
        if (product.discountPercent) {
            return product.listPrice*(1-product.discountPercent) <= this.maxDiscount;
        } else if (product.listPrice) {
            return product.listPrice <= this.maxDiscount;
        }
        return false;
    }
}
