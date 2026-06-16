import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class Historial {
  // Aquí puedes conectar luego con tu backend en PostgreSQL
  pacienteInfo = {
    nombre: 'José Eduardo Gómez',
    curp: '999-76-6866',
    fechaNac: '1989-05-25',
    genero: 'M',
    nodo: 'Norte (Aguascalientes)'
  };

  expedientes = [
    {
      id: 'd0c40d10-8d87-447e-836e-99d26ad52ea5',
      fecha: '2010-01-23 17:45:28',
      establecimiento: 'HEALTHALLIANCE HOSPITALS INC',
      medico: 'Tomas Sauer',
      motivo: 'Acute bronchitis (disorder)'
    }
  ];
}