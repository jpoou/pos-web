import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  product: Product;
  pageType: string;

  // Private
  private unsubscribeAll: Subject<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private location: Location,
  ) {
    // Set the default
    this.product = new Product();
    // Set the private defaults
    this.unsubscribeAll = new Subject();
  }


  ngOnInit() {
    // Subscribe to update product on changes
    this.productService.onProductChanged
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(product => {

        if ( product ) {
          this.product = new Product(product);
          this.pageType = 'edit';
        } else {
          this.pageType = 'new';
          this.product = new Product();
        }
        this.productForm = this.createProductForm();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  /**
   * Create product form
   */
  createProductForm(): FormGroup {
    return this.formBuilder.group({
      id              : [this.product.id],
      name            : [this.product.name],
      code            : [this.product.code],
      quantity        : [this.product.quantity],
      image           : [this.product.image],
    });
  }

  /**
   * Save product
   */
  saveProduct(): void {
    const data = this.productForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.productService.saveProduct(data)
      .then(() => {
        // Trigger the subscription with new data
        this.productService.onProductChanged.next(data);
      });
  }

  /**
   * Add product
   */
  addProduct(): void {
    const data = this.productForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.productService.addProduct(data)
      .then(() => {

        // Trigger the subscription with new data
        this.productService.onProductChanged.next(data);

        // Change the location with new one
        // this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
      });
  }

  /**
   * Remove product
   */
  removeProduct(): void {
    const data = this.productForm.getRawValue();
    // data.handle = FuseUtils.handleize(data.name);

    this.productService.removeProduct(data)
      .then(() => {

        // Trigger the subscription with new data
        this.productService.onProductChanged.next(data);

        // Change the location with new one
        // his.location.go('products');
      });
  }
}
