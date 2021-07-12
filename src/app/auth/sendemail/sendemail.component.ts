import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.scss'],
  providers: [AuthService]
})
export class SendemailComponent implements OnInit {

  public user$:Observable<any> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }
  onSendEmail(){
    this.authSvc.sendVerificacionEmail();
  }
}
