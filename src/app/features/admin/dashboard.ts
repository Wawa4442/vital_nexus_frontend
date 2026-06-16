import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- Importamos el Router

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  vistaActual = 'reportes';
  filtros = { enfermedad: '', ciudad: '', fechaInicio: '' };
  resultadosReporte: any[] = [];

  // Inyectamos el router en el constructor
  constructor(private router: Router) {}

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  ejecutarFiltroAvanzado() {
    console.log('Ejecutando JOIN en vistas distribuidas con filtros:', this.filtros);
    this.resultadosReporte = [
      { paciente: 'José Eduardo Gómez', diagnostico: 'Acute bronchitis (disorder)', medicamento: 'Etonogestrel 68 MG', hospital: 'HEALTHALLIANCE HOSPITALS INC', ciudad: 'LEOMINSTER', fecha: '2010-01-23' },
      { paciente: 'María Consuelo Ruiz', diagnostico: 'Acute bronchitis (disorder)', medicamento: 'Azitromicina 500 MG', hospital: 'HOSPITAL CENTRAL DEL NORTE', ciudad: 'Chicopee', fecha: '2026-06-15' }
    ];
  }

  // --- NUEVA FUNCIÓN ---
  cerrarSesion() {
    // Aquí después limpiarás tokens o variables de sesión
    this.router.navigate(['/']);
  }
}