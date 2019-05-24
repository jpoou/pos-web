import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private product: ProductService) { }

  ngOnInit() {
    console.log('init');
  }


}
