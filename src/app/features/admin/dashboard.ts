import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'] // O .scss según uses
})
export class Dashboard implements OnInit {
  vistaActual = 'reportes';
  filtros = { enfermedad: '', ciudad: '', fechaInicio: '' };
  
  // Variables para la tabla dinámica
  resultadosReporte: any[] = [];
  datosCrud: any[] = [];
  columnasCrud: { key: string, label: string }[] = [];
  cargando = false;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.cargarDatosVista();
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
    this.cargarDatosVista();
  }

  // --- NÚCLEO DINÁMICO: Carga datos según la vista ---
  cargarDatosVista() {
    this.cargando = true;
    this.datosCrud = [];

    switch (this.vistaActual) {
      case 'nodos':
        this.columnasCrud = [
          { key: 'id_nodo', label: 'ID Nodo' },
          { key: 'nombre_region', label: 'Región' },
          { key: 'ip_servidor', label: 'IP' },
          { key: 'ubicacion_geografica', label: 'Ubicación' }
        ];
        this.apiService.getNodos().subscribe(res => {
          if (res.success) this.datosCrud = res.data;
          this.cargando = false;
        });
        break;

      case 'establecimientos':
        this.columnasCrud = [
          { key: 'nombre', label: 'Nombre del Hospital' },
          { key: 'ciudad', label: 'Ciudad' },
          { key: 'codigo_postal', label: 'C.P.' }
        ];
        this.apiService.getEstablecimientos().subscribe(res => {
          if (res.success) this.datosCrud = res.data;
          this.cargando = false;
        });
        break;

      case 'medicos':
        this.columnasCrud = [
          { key: 'nombre_completo', label: 'Nombre Médico' },
          { key: 'especialidad', label: 'Especialidad' }
        ];
        this.apiService.getMedicos().subscribe(res => {
          if (res.success) this.datosCrud = res.data;
          this.cargando = false;
        });
        break;

      case 'medicamentos':
        this.columnasCrud = [
          { key: 'codigo_medicamento', label: 'Código' },
          { key: 'nombre_generico', label: 'Fármaco' },
          { key: 'costo_base', label: 'Costo Base ($)' }
        ];
        this.apiService.getCatalogoMedicamentos().subscribe(res => {
          if (res.success) this.datosCrud = res.data;
          this.cargando = false;
        });
        break;

      case 'reportes':
      default:
        this.cargando = false;
        break;
    }
  }

  ejecutarFiltroAvanzado() {
    console.log('Ejecutando JOIN en vistas distribuidas con filtros:', this.filtros);
    // TODO: Conectar esto a un endpoint real de reportes en tu API cuando esté listo
    this.resultadosReporte = [
      { paciente: 'José Eduardo Gómez', diagnostico: 'Acute bronchitis (disorder)', medicamento: 'Etonogestrel 68 MG', hospital: 'HEALTHALLIANCE HOSPITALS INC', ciudad: 'LEOMINSTER', fecha: '2010-01-23' },
      { paciente: 'María Consuelo Ruiz', diagnostico: 'Acute bronchitis (disorder)', medicamento: 'Azitromicina 500 MG', hospital: 'HOSPITAL CENTRAL DEL NORTE', ciudad: 'Chicopee', fecha: '2026-06-15' }
    ];
  }

  cerrarSesion() {
    // Es crítico llamar al backend para destruir la cookie HttpOnly
    this.apiService.logoutAdmin().subscribe({
      next: () => this.router.navigate(['/']),
      error: () => this.router.navigate(['/']) // Redirigir incluso si el backend falla
    });
  }
}