import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  pacienteInfo: any = null;
  cargando = true;
  
  // Variables de control para la interfaz
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  datosSupervivencia = {
    tipoSangre: 'O+',
    alergias: 'Penicilina',
    condiciones: 'Ninguna',
    contactoEmergencia: '',
    donadorOrganos: true
  };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }
    const nss = localStorage.getItem('paciente_nss');
    if (!nss) { 
      this.router.navigate(['/auth/portal']); 
      return; 
    }

    this.api.getPacienteByNss(nss).subscribe({
      next: (res: any) => {
        if(res.success && res.data) {
          // Aseguramos extraer el objeto correctamente por si el backend devuelve un array
          this.pacienteInfo = Array.isArray(res.data) ? res.data[0] : res.data;
        } else {
          this.mensajeError = 'No se pudo recuperar la información del perfil maestro.';
        }
        this.cargando = false;
      },
      error: (err: any) => {
        this.mensajeError = 'Error de conexión con el nodo de la base de datos.';
        this.cargando = false;
      }
    });
  }

  guardarDatos() {
    this.guardando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    // TODO: Conectar a un endpoint real (ej. this.api.actualizarPerfilPaciente(...))
    // Por ahora simulamos la latencia de la red distribuida con un setTimeout
    setTimeout(() => {
      this.guardando = false;
      this.mensajeExito = `El perfil de supervivencia de ${this.pacienteInfo?.nombre} ha sido sincronizado en toda la red VITAL NEXUS.`;
    }, 1500);
  }
}