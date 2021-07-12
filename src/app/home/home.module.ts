import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from '../components/products/products.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';



@NgModule({
  declarations: [HomeComponent,ProductsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
  ],
  exports: []
})
export class HomeModule { }
