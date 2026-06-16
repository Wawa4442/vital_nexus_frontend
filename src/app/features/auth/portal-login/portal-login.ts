import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portal-login.html',
  styleUrls: ['./portal-login.css']
})
export class PortalLogin {
  rolActivo: 'paciente' | 'medico' = 'paciente';
  
  credenciales = {
    identificador: '', // CURP para paciente, ID para médico
    password: ''
  };

  constructor(private router: Router) {}

  setRol(rol: 'paciente' | 'medico') {
    this.rolActivo = rol;
    this.credenciales.identificador = '';
    this.credenciales.password = '';
  }

  autenticar() {
    console.log(`Autenticando ${this.rolActivo}...`);
    // Simulación de ruteo post-login
    if (this.rolActivo === 'paciente') {
      this.router.navigate(['/paciente/historial']);
    } else {
      this.router.navigate(['/medico/consultas']);
    }
  }
}