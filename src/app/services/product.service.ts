import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements Resolve<any> {

  routeParams: any;
  product: any;
  onProductChanged: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    // Set the defaults
    this.onProductChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

    this.routeParams = route.params;

    return new Promise((resolve, reject) => {

      Promise.all([
        this.getProduct()
      ]).then(
        () => {
          resolve();
        },
        reject
      );
    });
  }

  /**
   * Get products
   */
  getProducts(): Promise<any> {
    return new Promise( (resolve, reject) => {
      this.http.get(environment.uri + 'api/products').subscribe( response => {
        resolve(response);
      }, reject);
    });
  }

  /**
   * Get product
   */
  getProduct(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ( this.routeParams.id === 'new' ) {
        this.onProductChanged.next(false);
        resolve(false);
      } else {
        this.http.get( environment.uri + 'api/products/' + this.routeParams.id)
          .subscribe((response: any) => {
            this.product = response;
            this.onProductChanged.next(this.product);
            resolve(response);
          }, reject);
      }
    });
  }

  /**
   * Save product
   *
   */
  saveProduct(product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(environment.uri + 'api/products/' + product.id, product)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Add product
   *
   */
  addProduct(product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(environment.uri + 'api/products', product)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  /**
   * Remove product
   *
   */
  removeProduct(product): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.uri + 'api/products/' + product.id)
        .subscribe((response: any) => {
          // resolve(response);
        }, reject);
    });
  }
}
