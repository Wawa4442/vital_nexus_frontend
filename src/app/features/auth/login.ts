import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credenciales = {
    username: '',
    password: ''
  };
  errorMensaje = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    // Aquí iría la llamada a tu API para validar el password_hash
    if (this.credenciales.username === 'admin' && this.credenciales.password === 'vital2026') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.errorMensaje = 'Credenciales inválidas o sin permisos de DBA.';
    }
  }
}