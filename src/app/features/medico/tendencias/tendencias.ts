import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-tendencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tendencias.html',
  styleUrls: ['./tendencias.css']
})
export class Tendencias implements OnInit {
  pacienteInfo: any = null;
  cargando = true;
  errorMensaje = '';

  // NOTA: Datos simulados para la UI. 
  // A futuro, esto debería venir de un endpoint tipo GET /api/expedientes/vítales/:id
  historialPresion = [
    { fecha: 'Ene', sistolica: 140, diastolica: 90 },
    { fecha: 'Feb', sistolica: 135, diastolica: 85 },
    { fecha: 'Mar', sistolica: 128, diastolica: 82 },
    { fecha: 'Abr', sistolica: 120, diastolica: 80 }
  ];

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
    if (!nss) { 
      this.router.navigate(['/auth/portal']); 
      return; 
    }

    this.api.getPacienteByNss(nss).subscribe({
      next: (res: any) => {
        if (res.success && res.data) {
          this.pacienteInfo = res.data;
        } else {
          this.errorMensaje = 'No se encontró la información del paciente.';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.errorMensaje = 'Error al conectar con la base de datos distribuida.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  calcularAltura(valor: number): string {
    // Calculamos el porcentaje, pero usamos Math.min para toparlo al 100% 
    // y evitar que la barra se desborde visualmente si el valor supera los 160.
    const porcentaje = (valor / 160) * 100;
    return `${Math.min(porcentaje, 100)}%`;
  }
}