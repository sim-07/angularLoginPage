import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {





  email: string = '';
  password: string = '';


  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  login() {

    if (this.email == '') {
      this.snackBar.open('Enter email', 'OK', {
        duration: 4000,
      });
      return;
    }

    if (this.password == '') { 
      this.snackBar.open('Enter password', 'OK', {
        duration: 4000,
      });
      return;
    }

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }


  hide: boolean = true;

  @HostListener('document:keydown.enter')
  handleKeyPress() {
    this.login();
  }

}
