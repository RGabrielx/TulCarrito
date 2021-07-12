import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  incorrect= false;
  LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onLogin() {
    const { email, password } = this.LoginForm.value;
    try {
      const user = await this.authSvc.Login(email, password);
      
      if (user) {
        this.incorrect = false;
        if (user && user.user.emailVerified) {
          this.router.navigate(['/home'])
        } else if (user) {
          this.router.navigate(['/verification-email'])
        } else {
          this.router.navigate(['/register'])
        }
      } else {
        this.incorrect = true;
      }
    }
    catch (error) {
    }
  }

}
