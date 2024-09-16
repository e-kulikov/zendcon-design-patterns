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
    //@TODO use the strategy to filter products that don't meet criteria
    this.products.map(
      (product) =>
        filterStrategy.filter(product) && filteredProducts.push(product)
    );
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
  //@TODO implement a strategy for filtering products by manufacturer
  constructor(private manufacturer: string) {
    this.manufacturer = manufacturer;
  }
  filter(product: Product): boolean {
    return product.manufacturer === this.manufacturer;
  }
}

export class MaxPriceFilter implements ProductFilteringStrategy {
  //@TODO implement a strategy for filtering products by maximum price
  constructor(public price: number) {
    this.price = price;
  }
  filter(product: Product): boolean {
    if (product.listPrice && product.discountPercent) {
      return (
        product.listPrice - product.listPrice * product.discountPercent <=
        this.price
      );
    }
    if (product.listPrice) {
      return product.listPrice <= this.price;
    }
    return false;
  }
}
