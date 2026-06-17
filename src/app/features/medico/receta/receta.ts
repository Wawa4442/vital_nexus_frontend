import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Importamos Router para la navegación
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-receta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receta.html',
  styleUrls: ['./receta.css']
})
export class Receta implements OnInit {
  catalogoMedicamentos: any[] = [];
  expedienteActivo = '';
  
  // Variables de control de UI
  cargandoCatalogo = true;
  guardando = false;
  mensajeExito = '';
  mensajeError = '';

  nuevaReceta = {
    id_receta: '',
    id_expediente: '',
    codigo_medicamento: '',
    instrucciones: '',
    estado_surtido: 'PENDIENTE',
    fecha_prescripcion: ''
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
    this.expedienteActivo = localStorage.getItem('expediente_actual') || '';

    if (!this.expedienteActivo) {
      // Si no hay expediente, detenemos la carga, la vista mostrará el mensaje de error
      this.cargandoCatalogo = false;
      this.cdr.detectChanges();
      return;
    }

    this.nuevaReceta.id_expediente = this.expedienteActivo;

    this.api.getCatalogoMedicamentos().subscribe({
      next: (res: any) => {
        if(res.success) {
          this.catalogoMedicamentos = res.data;
        } else {
          this.mensajeError = 'No se pudo cargar el catálogo de medicamentos.';
        }
        this.cargandoCatalogo = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensajeError = 'Error de conexión al cargar el catálogo maestro.';
        this.cargandoCatalogo = false;
        this.cdr.detectChanges();
      }
    });
  }

  generarPrescripcion() {
    // Validación de campos vacíos
    if (!this.nuevaReceta.codigo_medicamento || !this.nuevaReceta.instrucciones.trim()) {
      return;
    }

    this.guardando = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    // Generamos un ID más robusto usando Date.now() para evitar colisiones
    this.nuevaReceta.id_receta = 'REC-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 10);
    
    // Ajuste de zona horaria para formato local ISO
    const tzoffset = (new Date()).getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
    this.nuevaReceta.fecha_prescripcion = localISOTime;

    this.api.registrarReceta(this.nuevaReceta).subscribe({
      next: (res: any) => {
        if(res.success) {
          this.mensajeExito = 'Receta firmada electrónicamente y transmitida a V_RECETA con éxito.';
          // Limpiamos los campos por si requiere agregar otro medicamento al mismo expediente
          this.nuevaReceta.instrucciones = '';
          this.nuevaReceta.codigo_medicamento = '';
        } else {
          this.mensajeError = res.message || 'Error al procesar la receta.';
        }
        this.guardando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.mensajeError = err.error?.message || 'Error de sincronización con el servidor central.';
        this.guardando = false;
        this.cdr.detectChanges();
      }
    });
  }

  volverConsultas() {
    this.router.navigate(['/medico/consultas']);
  }
}