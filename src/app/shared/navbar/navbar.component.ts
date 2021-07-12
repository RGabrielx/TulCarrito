import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  providers: [AuthService]

})
export class NavbarComponent implements OnInit {
  public isLogged = false;
  public user$: Observable<any> = this.authSvc.afAuth.user;


  constructor(private authSvc: AuthService, private router: Router) { }

  async ngOnInit() {

  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
    }
  }

}
