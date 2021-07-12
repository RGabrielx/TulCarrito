import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { product_carts } from 'src/app/models/product';


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.less']
})
export class HistoricoComponent implements OnInit {
  CarritoList: product_carts[];
  uid = '';
  item: any;
  total: number;

  constructor(public carritoService: CarritoService,
    public firebaseauthService: AngularFireAuth,

  ) { }

  ngOnInit(): void {
    this.firebaseauthService.authState.subscribe(res => {
      if (res !== null) {
        this.uid = res.uid;
        this.carritoService.getCarrito()
          .snapshotChanges()
          .subscribe(item => {

            this.CarritoList = [];
            item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if (x["fusuario"] === this.uid) {
                this.CarritoList.push(x as product_carts);
              }
            });
            this.total = 0;
            for (var i = 0; i < this.CarritoList.length; i++) {
              if (this.CarritoList[i].cart_id.status === "completed") {
                this.total = this.CarritoList[i].quantity + this.total;
              }
            }
          });
      }
    });
  }
}



