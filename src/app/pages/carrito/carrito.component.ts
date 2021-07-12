import { Component, OnInit } from '@angular/core';
import { product_carts } from 'src/app/models/product';
import { CarritoService } from 'src/app/services/carrito.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.less']
})
export class CarritoComponent implements OnInit {


  gridStyle = {
    width: '40%',
  };
  gridStyle1 = {
    width: '60%',
    textAlign: 'center',
    borderRadius: '10px'
  };

  CurrentDate = new Date();
  isVisible = false;
  isOkLoading = false;

  CarritoList: product_carts[];
  uid = '';
  item: any;
  total: number;

  constructor(
    public carritoService: CarritoService,
    public firebaseauthService: AngularFireAuth,
    private router: Router,
    private modal: NzModalService,

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
              if (this.CarritoList[i].cart_id.status === "pending") {
                this.total = this.CarritoList[i].quantity + this.total;
              }
            }
          });
      }
    });
  }

  agregar(producto) {
    producto.quantity = producto.quantity + 1;
    this.carritoService.ActualizarCarrito(producto);
  }

  quitar(producto) {
    producto.quantity = producto.quantity - 1;
    this.carritoService.ActualizarCarrito(producto);
  }

  eliminar(key) {
    this.showDeleteConfirm(key);
  }

  terminarCompra(productos) {
    var idcard = 0;

    this.CarritoList.sort((a, b) => parseInt(a.cart_id.id) - parseInt(b.cart_id.id));

    for (var l = 0; l < this.CarritoList.length; l++) {
      if ( (this.CarritoList[l].fusuario === this.uid) && (idcard < parseInt(this.CarritoList[l].cart_id.id) )) {
        idcard = parseInt(this.CarritoList[l].cart_id.id);
      }
    }

    console.log("productos",productos);
    console.log("idcard",idcard);
    console.log("CarritoList",this.CarritoList);
    
    for (var i = 0; i < productos.length; i++) {
      if (this.CarritoList[i].cart_id.status !== "completed") {
        productos[i].cart_id.status = 'completed';
        productos[i].cart_id.id = (idcard === 0) ? '1' : (idcard + 1).toString();
        this.carritoService.ActualizarCarrito(productos[i]);
      }
    }
    this.openAndCloseAll();
  }

  handleOk(): void {
    this.modal.closeAll()
    this.router.navigate(['/home']);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }

  showDeleteConfirm(key): void {
    this.modal.confirm({
      nzTitle: 'Esta seguro que desea eliminar este producto?',
      nzOkText: 'Si',
      nzOkType: 'primary',
      nzOnOk: () => this.carritoService.removeProducto(key),
      nzCancelText: 'No',
    });
  }

  openAndCloseAll(): void {
    let pos = 0;

    ['success'].forEach(method =>
      this.modal[method]({
        nzMask: false,
        nzTitle: `Hola`,
        nzOnOk: this.handleOk(),
        nzContent: `Hemos terminado la compra`,
        nzStyle: { position: 'absolute', top: `${0 * 70}px`, left: `${0 * 300}px` }
      })
    );
    this.modal.afterAllClose.subscribe();
    setTimeout(() => this.modal.closeAll(), 2000);
  }


}


