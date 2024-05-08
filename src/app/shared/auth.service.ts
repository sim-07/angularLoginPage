import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth'
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private fireauth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {  }




  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then( res => {
      localStorage.setItem('token', 'true');
      localStorage.setItem('email', email);
      this.router.navigate(['/dashboard']);

      if (res.user?.emailVerified == true) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        this.snackBar.open('Account not activated', 'OK', {
          duration: 4000,
        });
      }
    }, err => {
      this.snackBar.open('Wrong email or password', 'OK', {
        duration: 4000,
      });
        this.router.navigate(['/login']);
    })
  }


  //register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {


      this.snackBar.open('Registered. Activate your account with the email that was sent to you', 'OK', {
        duration: 8000,
      });
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);

    }, err => {
      this.snackBar.open(err.message, 'OK', {
        duration: 4000,
      });
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      this.snackBar.open(err.message, 'OK', {
        duration: 4000,
      });
    })
  }

  //forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/verify-email']);
    }, err => {
      this.snackBar.open('Error. Unregistered email', 'OK', {
        duration: 4000,
      });
    })
  }

  //email verification
  sendEmailForVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/login']);
    }, (err: any) => {
      this.snackBar.open('Error. The email has not been sent', 'OK', {
        duration: 4000,
      });
    })
  }

  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, (err: any) => {
      this.snackBar.open(err.message, 'OK', {
        duration: 4000,
      });
    })
  }

}
