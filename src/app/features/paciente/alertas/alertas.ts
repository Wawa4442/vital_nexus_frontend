import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alertas-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.css']
})
export class Alertas {
  alertasActivas = [
    {
      tipo: 'Brote Detectado',
      enfermedad: 'Influenza Estacional',
      zona: 'Aguascalientes (Centro)',
      nivel: 'Alto',
      fecha: '15/06/2026',
      recomendacion: 'Acudir al centro de salud más cercano para vacunación preventiva.'
    },
    {
      tipo: 'Prevención',
      enfermedad: 'Dengue',
      zona: 'Región Bajío',
      nivel: 'Medio',
      fecha: '10/06/2026',
      recomendacion: 'Evitar acumulación de agua estancada en domicilios.'
    }
  ];

  hospitalesCercanos = [
    { nombre: 'Hospital Hidalgo', distancia: '1.2 km', tipo: 'Público', disponibilidad: 'Alta' },
    { nombre: 'Clínica MAC', distancia: '3.5 km', tipo: 'Privado', disponibilidad: 'Media' },
    { nombre: 'Centro de Salud Norte', distancia: '5.0 km', tipo: 'Público', disponibilidad: 'Alta' }
  ];
}