import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  register() {

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

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  hide: boolean = true;

  @HostListener('document:keydown.enter')
  handleKeyPress() {
    this.register();
  }

}
