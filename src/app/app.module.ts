import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//FIREBASE
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database'

import { environment } from 'src/environments/environment';

//COMPONENTES
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SendemailComponent } from './auth/sendemail/sendemail.component';
import { CarritoComponent } from './pages/carrito/carrito.component';

// SERVICES
import { ProductService } from './services/product.service';
import { AuthService } from './auth/services/auth.service';
import { CheckloginGuard } from './shared/guards/checklogin.guard';

// NG-ZORRO
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HistoricoComponent } from './pages/historico/historico.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';




registerLocaleData(es); 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SendemailComponent,
    CarritoComponent,
    HistoricoComponent,
       
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    NzMenuModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzLayoutModule,
    NzTableModule,
    NzModalModule,
    BrowserAnimationsModule ,   
    NzAvatarModule,
    NzGridModule,
    NzTimelineModule
  ],
  providers: [ProductService, { provide: NZ_I18N, useValue: es_ES },AuthService,CheckloginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
