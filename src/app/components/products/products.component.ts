import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  datos = new Product();
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.datos= {
      $key:"2",
      id:"7",
      nombre: "Reloj",
      sku: "39SSFA4SEEWW",
      descripcion: "Relog unisex dorado"
    }
  
    this.productService.getproduct();
    this.productService.selectProduct = new Product();
    //this.productService.insertproduct(this.datos);
    
  }

}
