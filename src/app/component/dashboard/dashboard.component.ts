import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  email = localStorage.getItem('email');

  constructor(private snackBar: MatSnackBar, private authService: AuthService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    

    if (localStorage.getItem('token')) {
      this.snackBar.open(`Welcome ${this.email}!`, '', {
        duration: 4000,
      });
    } else {
      this.router.navigate(['/login']);
    }


  }

  logout() {
    this.auth.logout();
  }

  delete() {
    /*this.authService.deleteAccount()
      .then(() => {
        // L'account utente è stato eliminato con successo
        this.router.navigate(['/login']);
        this.snackBar.open('Account deleted', 'OK', {
          duration: 4000,
        });
      })
      .catch((error: any) => {
        // Si è verificato un errore durante l'eliminazione dell'account utente
        console.log(error);
        this.snackBar.open('An error occurred while deleting the account', 'OK', {
          duration: 4000,
        });
      });*/
  }
}
