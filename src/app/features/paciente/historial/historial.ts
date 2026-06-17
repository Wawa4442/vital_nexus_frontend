import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
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
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const nss = localStorage.getItem('paciente_nss');
    console.log('ngOnInit: nss =', nss);
    if (!nss) { 
      this.router.navigate(['/auth/portal']); 
      return; 
    }
    
    console.log('Llamando a getPacienteByNss...');
    this.api.getPacienteByNss(nss).subscribe({
      next: (res: any) => {
        console.log('getPacienteByNss completado, res =', res);
        if(res.success && res.data) {
          // Adaptación: si el backend ya devuelve el objeto directo o un array
          this.pacienteInfo = Array.isArray(res.data) ? res.data[0] : res.data;
          console.log('pacienteInfo asignado:', this.pacienteInfo);

          if (this.pacienteInfo && this.pacienteInfo.curp_ssn) {
            this.cargarExpedientes(this.pacienteInfo.curp_ssn);
          } else {
            this.error = 'El expediente unificado no pudo ser procesado.';
            console.error(this.error);
          }
        } else {
          this.error = 'No se encontró un paciente registrado con ese NSS.';
          console.error(this.error);
        }
        this.cargando = false;
        console.log('cargando establecido en false');
        this.cdr.detectChanges();
      },
      error: (err: any) => { 
        this.error = 'Error de conexión con la base de datos distribuida.'; 
        console.error(this.error, err);
        this.cargando = false; 
        this.cdr.detectChanges();
      }
    });
  }

  cargarExpedientes(id: string) {
    this.cargandoHistorial = true;
    console.log('Llamando a getHistorialPaciente con curp_ssn =', id);
    this.api.getHistorialPaciente(id).subscribe({
      next: (res: any) => {
        console.log('getHistorialPaciente completado, res =', res);
        if(res.success) {
          this.expedientes = res.data || [];
          console.log('expedientes asignados:', this.expedientes);
        } else {
          this.error = 'Error al recuperar el detalle de las consultas.';
          console.error(this.error);
        }
        this.cargandoHistorial = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Los nodos de almacenamiento de consultas no responden.';
        console.error(this.error, err);
        this.cargandoHistorial = false;
        this.cdr.detectChanges();
      }
    });
  }
}