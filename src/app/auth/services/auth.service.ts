import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  userData: any;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? false : true;
  }

  async sendVerificacionEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async Login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      return result;
    } catch (error) {
    }

  }

  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificacionEmail();
      return result;
    } catch (error) {
    }

  }

  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
    } catch (error) {
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();

  }





}
