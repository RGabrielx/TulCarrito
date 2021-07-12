import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ProductList: AngularFireList<any>;
  selectProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getproduct() {
    return this.ProductList = this.firebase.list('products');
  }

  insertproduct(product: Product) {
    this.ProductList.push({
      nombre: product.nombre,
      sku: product.sku,
      descripción: product.descripcion
    });
    
  }

  updateProduct(product: Product) {    
    this.ProductList.update(product.$key, product);
  }

  deleteProduct($key: string){
    this.ProductList.remove($key);
  }

}
