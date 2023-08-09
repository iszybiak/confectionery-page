import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "./product";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/products`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/products`, [product] );
  }

  public updateProduct(productId: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiServerUrl}/products/${productId}`, {requestBody: product});
  }

  public deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/products/${productId}`);
  }
}
