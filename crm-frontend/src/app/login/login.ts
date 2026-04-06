import { Component } from '@angular/core';
import { ApiService } from '../core/services/api';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.api.login(data).subscribe({
      next: (res) => {
        console.log(res);

        // guardar token
        localStorage.setItem('token', res.token);

        // redirigir al dashboard
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error login', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
