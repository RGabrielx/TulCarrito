import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendemailComponent } from './auth/sendemail/sendemail.component';
import { ProductsComponent } from './components/products/products.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { CheckloginGuard } from './shared/guards/checklogin.guard';


const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule), canActivate:[CheckloginGuard] },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'verification-email', component: SendemailComponent},
  { path: 'Productos', component: ProductsComponent},
  { path: 'carrito', component: CarritoComponent},
  { path: 'historico', component: HistoricoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
