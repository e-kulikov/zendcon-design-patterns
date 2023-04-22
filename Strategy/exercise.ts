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
        this.products.forEach(product => {
            if(filterStrategy.filter(product)) {
                filteredProducts.push(product);
            }
        });
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
    constructor(private manufacturer: string) {
        this.manufacturer = manufacturer;
    }
    filter(product: Product): boolean {
        return product.manufacturer === this.manufacturer ? true : false;
    }
}

export class MaxPriceFilter implements ProductFilteringStrategy {
    constructor(private maxPrice: number) {
        this.maxPrice = maxPrice;
    }
    filter(product: Product): boolean {
        if (product.listPrice && product.discountPercent) {
            return product.listPrice - (product.listPrice * product.discountPercent) <= this.maxPrice;
        } else if (product.listPrice) {
            return product.listPrice <= this.maxPrice;
        }
        return false;
    }
}
