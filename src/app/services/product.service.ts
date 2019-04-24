import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    console.log(environment);
  }


  getProducts(): Observable<any> {
    return this.http.get(environment.uri + 'api/products');
  }
}
