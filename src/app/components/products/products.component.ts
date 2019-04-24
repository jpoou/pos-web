import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private product: ProductService) { }

  ngOnInit() {
    this.product.getProducts().subscribe(response => {
      this.products = response;
      console.log(response);
    });
    console.log(this.products);
  }

}
