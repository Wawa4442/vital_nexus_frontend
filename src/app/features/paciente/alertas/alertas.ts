import { Component, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-alertas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alertas.html',
  styleUrls: ['./alertas.css']
})
export class Alertas implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  public isBrowser: boolean;

  // Alertas simuladas (A futuro pueden venir de tu API)
  alertasActivas = [
    {
      id: 1,
      enfermedad: 'Influenza Estacional',
      zona: 'Centro / San Marcos',
      nivel: 'Alto',
      lat: 21.8800,
      lng: -102.2960,
      radio: 2000,
      color: '#e53e3e'
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initMap();
    }
  }

  ngOnDestroy(): void {
    // Es vital destruir el mapa al salir del componente para liberar memoria RAM
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap(): void {
    // Coordenadas base (Aguascalientes)
    this.map = L.map('vitalMap').setView([21.8853, -102.2916], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, 
      attribution: '© OpenStreetMap | VITAL NEXUS'
    }).addTo(this.map);

    // Iterar sobre las alertas para dibujar los focos de infección
    this.alertasActivas.forEach(alerta => {
      L.circle([alerta.lat, alerta.lng], { 
        color: alerta.color, 
        fillColor: alerta.color, 
        fillOpacity: 0.3, 
        radius: alerta.radio 
      })
      .addTo(this.map)
      .bindPopup(`<b>¡Brote de ${alerta.enfermedad}!</b><br>Nivel de riesgo: ${alerta.nivel}`);
    });
      
    // Hospital de referencia (A futuro lo puedes traer de tu endpoint de Establecimientos)
    L.circleMarker([21.9056, -102.2858], { 
      radius: 8, 
      fillColor: '#38a169', 
      color: '#fff', 
      weight: 2, 
      opacity: 1, 
      fillOpacity: 1 
    })
    .addTo(this.map)
    .bindPopup(`<b>Hospital Miguel Hidalgo</b><br>Capacidad Disponible: Alta`);
  }
}