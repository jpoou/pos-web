export class Product {
  id: bigint;
  name: string;
  code: string;
  quantity: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Constructor
   *
   */
  constructor(product?) {
    product = product || {};
    this.id = product.id || 0;
    this.code = product.code || '000000';
    this.name = product.name || '';
    this.quantity = product.quantity || 0;
    this.image = product.image || 'http://lorempixel.com/640/480/abstract';
  }
}
