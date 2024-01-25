import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct, IProductApi } from "../models/product";

@Injectable({
  providedIn: 'root'
})



export class ProductService {
  constructor(private http: HttpClient) {
  }
  
  getProducts(skip: number, limit: number): Observable<IProductApi> {
    return this.http.get<IProductApi>(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
  }

  getProductsByCategory(category: string): Observable<IProductApi> {
    return this.http.get<IProductApi>(`https://dummyjson.com/products/category/${category}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`https://dummyjson.com/products/categories`)
  }

  searchProducts(keyword: string): Observable<IProductApi> {
    return this.http.get<IProductApi>(`https://dummyjson.com/products/search?q=${keyword}`);
  }
}