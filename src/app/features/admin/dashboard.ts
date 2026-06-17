import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  // Variables para el modal CRUD
  mostrarModal = false;
  modoModal: 'crear' | 'editar' = 'crear';
  formModel: any = {};

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (typeof window === 'undefined') {
      return;
    }
    this.apiService.getAdminProfile().subscribe({
      next: (res) => {
        if (res.success) {
          this.cargarDatosVista();
        } else {
          this.router.navigate(['/auth/login']);
        }
      },
      error: () => {
        this.router.navigate(['/auth/login']);
      }
    });
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
          this.cdr.detectChanges();
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
          this.cdr.detectChanges();
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
          this.cdr.detectChanges();
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
          this.cdr.detectChanges();
        });
        break;

      case 'reportes':
      default:
        this.cargando = false;
        this.cdr.detectChanges();
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

  abrirModalCrear() {
    this.modoModal = 'crear';
    this.formModel = {};
    
    // Inicializar valores por defecto según la vista actual
    if (this.vistaActual === 'medicamentos') {
      this.formModel.requiere_receta = true;
    }
    
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(registro: any) {
    this.modoModal = 'editar';
    // Copiar objeto para no modificar directamente la tabla antes de guardar
    this.formModel = { ...registro };
    
    // Mapear booleanos para checkbox si es necesario
    if (this.vistaActual === 'medicamentos') {
      this.formModel.requiere_receta = !!this.formModel.requiere_receta;
    }
    
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.formModel = {};
    this.cdr.detectChanges();
  }

  guardarRegistro() {
    if (this.modoModal === 'crear') {
      this.crearRegistro();
    } else {
      this.actualizarRegistro();
    }
  }

  crearRegistro() {
    switch (this.vistaActual) {
      case 'nodos':
        this.apiService.registrarNodo(this.formModel).subscribe({
          next: (res) => this.handleSuccess('Nodo creado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'establecimientos':
        this.apiService.registrarEstablecimiento(this.formModel).subscribe({
          next: (res) => this.handleSuccess('Establecimiento creado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicos':
        this.apiService.registrarMedico(this.formModel).subscribe({
          next: (res) => this.handleSuccess('Médico creado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicamentos':
        this.apiService.registrarMedicamento(this.formModel).subscribe({
          next: (res) => this.handleSuccess('Medicamento creado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
    }
  }

  actualizarRegistro() {
    switch (this.vistaActual) {
      case 'nodos':
        this.apiService.updateNodo(this.formModel.id_nodo, this.formModel).subscribe({
          next: (res) => this.handleSuccess('Nodo actualizado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'establecimientos':
        this.apiService.updateEstablecimiento(this.formModel.id_establecimiento, this.formModel).subscribe({
          next: (res) => this.handleSuccess('Establecimiento actualizado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicos':
        this.apiService.updateMedico(this.formModel.id_medico, this.formModel).subscribe({
          next: (res) => this.handleSuccess('Médico actualizado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicamentos':
        this.apiService.updateMedicamento(this.formModel.codigo_medicamento, this.formModel).subscribe({
          next: (res) => this.handleSuccess('Medicamento actualizado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
    }
  }

  eliminarRegistro(registro: any) {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      return;
    }
    
    switch (this.vistaActual) {
      case 'nodos':
        this.apiService.deleteNodo(registro.id_nodo).subscribe({
          next: (res) => this.handleSuccess('Nodo eliminado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'establecimientos':
        this.apiService.deleteEstablecimiento(registro.id_establecimiento).subscribe({
          next: (res) => this.handleSuccess('Establecimiento eliminado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicos':
        this.apiService.deleteMedico(registro.id_medico).subscribe({
          next: (res) => this.handleSuccess('Médico eliminado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
      case 'medicamentos':
        this.apiService.deleteMedicamento(registro.codigo_medicamento).subscribe({
          next: (res) => this.handleSuccess('Medicamento eliminado exitosamente'),
          error: (err) => this.handleError(err)
        });
        break;
    }
  }

  private handleSuccess(mensaje: string) {
    alert(mensaje);
    this.cerrarModal();
    this.cargarDatosVista();
  }

  private handleError(err: any) {
    console.error(err);
    alert(err.error?.message || 'Ocurrió un error al procesar la solicitud');
  }
}