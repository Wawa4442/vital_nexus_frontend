import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medico-tendencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tendencias.html',
  styleUrls: ['./tendencias.css']
})
export class Tendencias {
  pacienteSeleccionado = 'José Eduardo Gómez';
  
  // Datos simulados de signos vitales en el tiempo
  historialPresion = [
    { fecha: 'Ene', sistolica: 140, diastolica: 90, estado: 'Alta' },
    { fecha: 'Feb', sistolica: 135, diastolica: 85, estado: 'Moderada' },
    { fecha: 'Mar', sistolica: 128, diastolica: 82, estado: 'Normal' },
    { fecha: 'Abr', sistolica: 120, diastolica: 80, estado: 'Óptima' },
    { fecha: 'May', sistolica: 118, diastolica: 78, estado: 'Óptima' }
  ];

  calcularAltura(valor: number): string {
    // Escala simple para CSS (Max 160 = 100%)
    return `${(valor / 160) * 100}%`;
  }
}