import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.html',
  styleUrls: ['./consultas.css']
})
export class Consultas implements OnInit {
  pacienteEncontrado: any = null;
  cargando = true;
  guardando = false; // Control para el botón de guardar
  error = '';

  nuevaConsulta = {
    id_expediente: '', 
    id_paciente: '',
    id_medico: '3421aa75-dec7-378d-a9e0-0bc764e4cb0d', // Hardcodeado por la nueva regla
    id_establecimiento: 'ef58ea08-d883-3957-8300-150554edc8fb', // Hardcodeado
    fecha_atencion: '', 
    motivo_consulta: ''
  };

  constructor(
    private api: ApiService, 
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }
    const nss = localStorage.getItem('paciente_nss');
    if(!nss) { 
      this.router.navigate(['/auth/portal']); 
      return; 
    }

    // Buscamos los datos del paciente para mostrarlos en pantalla
    this.api.getPacienteByNss(nss).subscribe({
      next: (res: any) => {
        if(res.success && res.data) {
          this.pacienteEncontrado = res.data;
          this.nuevaConsulta.id_paciente = this.pacienteEncontrado.id_paciente;
        } else {
          this.error = 'Paciente no encontrado en la base de datos distribuida.';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = 'Error de conexión al recuperar el expediente.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  guardarConsulta() {
    // Evitar envíos vacíos
    if (!this.nuevaConsulta.motivo_consulta.trim()) return;

    this.guardando = true;
    this.error = '';

    // Generamos el UUID y la fecha en el formato esperado por el backend (YYYY-MM-DD HH:mm:ss)
    this.nuevaConsulta.id_expediente = crypto.randomUUID();
    
    // Ajuste para obtener la fecha local correcta en formato ISO
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
    this.nuevaConsulta.fecha_atencion = localISOTime;

    this.api.registrarConsulta(this.nuevaConsulta).subscribe({
      next: (res: any) => {
        if(res.success) {
          // Guardamos el ID del expediente recién creado para usarlo en la vista de recetas
          localStorage.setItem('expediente_actual', this.nuevaConsulta.id_expediente);
          this.router.navigate(['/medico/receta']);
        } else {
          this.error = res.message || 'Error al guardar la consulta.';
          this.guardando = false;
        }
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Fallo de sincronización con el Nodo. Intente de nuevo.';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }
}