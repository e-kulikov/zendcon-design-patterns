import {
  ProductData,
  ProductInterface,
  ShippingMethodData,
  ShippingMethodInterface,
  ShopFactoryInterface,
} from "./shopping-cart-framework";

export class MyShopProductFactory implements ShopFactoryInterface {
  #productData: ProductData;
  #shippingMethodData: ShippingMethodData;
  constructor(
    productData: ProductData,
    shippingMethodData: ShippingMethodData
  ) {
    this.#productData = productData;
    this.#shippingMethodData = shippingMethodData;
  }
  createProduct(productCode: keyof ProductData): ProductInterface {
    return new MyShopProduct(
      productCode,
      this.#productData[productCode][0],
      this.#productData[productCode][1]
    );
  }
  createShippingMethod(
    shippingName: keyof ShippingMethodData
  ): ShippingMethodInterface {
    return new MyShippingMethod(
      shippingName,
      this.#shippingMethodData[shippingName][0],
      this.#shippingMethodData[shippingName][1]
    );
  }
}

export class MyShopProduct implements ProductInterface {
  #productCode: keyof ProductData;
  #productDescription: ProductData[keyof ProductData][0];
  #productWeight: ProductData[keyof ProductData][1];

  constructor(
    productCode: keyof ProductData,
    productDescription: ProductData[keyof ProductData][0],
    productWeight: ProductData[keyof ProductData][1]
  ) {
    this.#productCode = productCode;
    this.#productDescription = productDescription;
    this.#productWeight = productWeight;
  }
  get productCode(): keyof ProductData {
    return this.#productCode;
  }
  get productDescription(): ProductData[keyof ProductData][0] {
    return this.#productDescription;
  }
  get productWeight(): ProductData[keyof ProductData][1] {
    return this.#productWeight;
  }
}

export class MyShippingMethod implements ShippingMethodInterface {
  #shippingName: keyof ShippingMethodData;
  #shippingCoefficient1: ShippingMethodData[keyof ShippingMethodData][0];
  #shippingCoefficient2: ShippingMethodData[keyof ShippingMethodData][1];
  constructor(
    shippingName: keyof ShippingMethodData,
    shippingCoefficient1: ShippingMethodData[keyof ShippingMethodData][0],
    shippingCoefficient2: ShippingMethodData[keyof ShippingMethodData][1]
  ) {
    this.#shippingName = shippingName;
    this.#shippingCoefficient1 = shippingCoefficient1;
    this.#shippingCoefficient2 = shippingCoefficient2;
  }
  get courierName(): keyof ShippingMethodData {
    return this.#shippingName;
  }
  getCostEstimate(miles: number, product: ProductInterface): number {
    return (
      miles * this.#shippingCoefficient1 +
      product.productWeight * this.#shippingCoefficient2
    );
  }
}
