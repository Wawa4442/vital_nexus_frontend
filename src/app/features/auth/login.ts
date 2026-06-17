import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  credenciales = { username: '', password: '' };
  errorMensaje = '';
  cargando = false;

  constructor(private router: Router, private api: ApiService) {}

  iniciarSesion() {
    // 1. Validación básica para no saturar al backend con peticiones vacías
    if (!this.credenciales.username || !this.credenciales.password) {
      this.errorMensaje = 'Por favor, ingresa tu usuario y contraseña.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = '';

    this.api.loginAdmin(this.credenciales).subscribe({
      next: (respuesta: any) => { 
        if (respuesta.success) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          // 2. Manejo por si la API responde 200 OK, pero el login falla por credenciales
          this.cargando = false;
          this.errorMensaje = respuesta.message || 'Credenciales incorrectas.';
        }
      },
      error: (err: any) => { 
        this.cargando = false;
        // 3. Captura el mensaje exacto que configuraste en tu index.js / backend
        this.errorMensaje = err.error?.message || 'Error de conexión con el servidor maestro.';
      }
    });
  }
}