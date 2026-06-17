import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class Historial implements OnInit {
  pacienteInfo: any = null;
  expedientes: any[] = [];
  cargando = true;
  cargandoHistorial = false; // Nuevo flag específico para la tabla
  error = '';

  constructor(
    private api: ApiService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
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
          // Adaptación: si el backend ya devuelve el objeto directo o un array
          this.pacienteInfo = Array.isArray(res.data) ? res.data[0] : res.data;

          if (this.pacienteInfo && this.pacienteInfo.id_paciente) {
            this.cargarExpedientes(this.pacienteInfo.id_paciente);
          } else {
            this.error = 'El expediente unificado no pudo ser procesado.';
          }
        } else {
          this.error = 'No se encontró un paciente registrado con ese NSS.';
        }
        this.cargando = false;
      },
      error: (err: any) => { 
        this.error = 'Error de conexión con la base de datos distribuida.'; 
        this.cargando = false; 
      }
    });
  }

  cargarExpedientes(id: string) {
    this.cargandoHistorial = true;
    this.api.getHistorialPaciente(id).subscribe({
      next: (res: any) => {
        if(res.success) {
          this.expedientes = res.data || [];
        } else {
          this.error = 'Error al recuperar el detalle de las consultas.';
        }
        this.cargandoHistorial = false;
      },
      error: (err: any) => {
        this.error = 'Los nodos de almacenamiento de consultas no responden.';
        this.cargandoHistorial = false;
      }
    });
  }
}