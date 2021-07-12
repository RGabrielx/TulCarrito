import { Injectable } from '@angular/core';

import { carts, Product, product_carts } from '../models/product';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';

import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productcarts: AngularFireList<any>;
  private pedido: AngularFireList<any>;
  private pedido2: product_carts[];


  private cart: carts;
  uid = '';
  correo = '';
  item: any;

  constructor(public firebaseauthService: AngularFireAuth,
    private firebase: AngularFireDatabase,
    public router: Router,

  ) {
    this.firebaseauthService.authState.subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.correo = res.email;
        this.loadCarrito();
      }
    });
  }

  loadCarrito() {
    this.productcarts = this.firebase.list('product_carts');
    this.productcarts.snapshotChanges().subscribe(item => {

      this.pedido2 = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.pedido2.push(x as product_carts);
      })
    });

  }

   getCarrito() {
     return this.productcarts =  this.firebase.list('product_carts');
  }

  addProducto(producto: Product) {
    var variable;
    if (this.uid.length) {
      this.pedido =  this.firebase.list('product_carts');

      this.pedido.snapshotChanges().subscribe(item => {

        this.pedido2 = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.pedido2.push(x as product_carts);
        })

      });

      if (this.pedido2) {
        for (var i = 0; i < this.pedido2.length; i++) {
          if ((this.pedido2[i].fusuario.toString() == this.uid.toString()) && this.pedido2[i].product_id && (this.pedido2[i].product_id.id == producto.id)) {
            this.item = this.pedido2[i];
          }
        }
      }

      if (this.item !== undefined && this.item.cart_id.status==='pending') {
        this.item.quantity = this.item.quantity + 1;
        const $key = this.item.$key
        delete this.item.$key
        this.productcarts.update($key, this.item); 
        this.pedido =  this.firebase.list('product_carts');

        return  true;

      }
      else {

        this.productcarts.push({
          cart_id: {
            id: "0",
            status: 'pending',
          },
          product_id: {
            nombre: producto.nombre,
            sku: producto.sku,
            descripcion: producto.descripcion,
            id: producto.id
          },
          fusuario: this.uid,
          quantity: 1
        });
        this.pedido =  this.firebase.list('product_carts');

        return  true;
      }

    } else {

      this.router.navigate(['/login']);
      this.pedido =  this.firebase.list('product_carts');

      return false;
    }

    return variable;

  }

  removeProducto($key: string) {
    this.productcarts.remove($key);

  }

  ActualizarCarrito(item: product_carts) {
    const $key = item.$key
    delete item.$key
    this.productcarts.update($key, item);

  }


}
