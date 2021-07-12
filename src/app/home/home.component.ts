import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CarritoService } from '../services/carrito.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  providers: [NzMessageService,NzNotificationService]
})
export class HomeComponent implements OnInit {

  productList: Product[];
  constructor(
    private productService: ProductService,
    public carritoService: CarritoService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.productService.getproduct()
      .snapshotChanges()
      .subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.productList.push(x as Product);
        })
      })
  }

  addCarrito(product) {
    var variable ;
    variable = this.carritoService.addProducto(product);
    if (variable === true) {
      this.createBasicMessage();
    }else{
      this.createBasicNotification();
    }
  }

    createBasicMessage(): void {
      this.message.create('success', `El producto se agrego al carrito`);
    }

    createBasicNotification(): void {
      this.notification
        .blank(
          'Hola',
          'Debes Acceder para poder agregar al carrito.'
        )
        .onClick.subscribe(() => {
        });
    }
}
