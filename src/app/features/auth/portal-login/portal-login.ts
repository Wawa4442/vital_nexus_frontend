import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-portal-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portal-login.html',
  styleUrls: ['./portal-login.css']
})
export class PortalLogin {
  rolActivo: 'paciente' | 'medico' = 'paciente';
  nss: string = '';
  cargando = false;
  errorMensaje = ''; // Añadimos manejo de errores

  constructor(private router: Router, private api: ApiService) {}

  setRol(rol: 'paciente' | 'medico') {
    this.rolActivo = rol;
    this.errorMensaje = ''; // Limpiamos errores si cambia de rol
  }

  consultarExpediente() {
    const nssLimpio = this.nss.trim();
    if (!nssLimpio) return;
    
    this.cargando = true;
    this.errorMensaje = '';

    // Consultamos al backend si el NSS existe
    this.api.getPacienteByNss(nssLimpio).subscribe({
      next: (res: any) => {
        this.cargando = false;
        
        // Si el backend confirma que el paciente existe
        if (res.success && res.data) {
          // Guardamos el NSS y el ID real (UUID) para hacer las peticiones posteriores
          localStorage.setItem('paciente_nss', nssLimpio);
          localStorage.setItem('paciente_id', res.data.id_paciente); 
          
          // Redirigimos según el rol
          if (this.rolActivo === 'paciente') {
            this.router.navigate(['/paciente/historial']);
          } else {
            this.router.navigate(['/medico/consultas']);
          }
        } else {
          // Si responde éxito pero data viene vacío o false
          this.errorMensaje = 'No se encontró ningún expediente con este NSS.';
        }
      },
      error: (err: any) => {
        this.cargando = false;
        // Si el backend devuelve un 404 u otro error
        this.errorMensaje = err.error?.message || 'Error al conectar con la base de datos distribuida.';
      }
    });
  }
}