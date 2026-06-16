import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  datosSupervivencia = {
    tipoSangre: 'O+',
    alergias: 'Penicilina, Nueces',
    condiciones: 'Asma leve',
    contactoEmergencia: 'María Gómez (Hermana) - 449-555-0192',
    donadorOrganos: true
  };

  guardarDatos() {
    console.log('Sincronizando datos de supervivencia con el nodo principal...', this.datosSupervivencia);
    alert('Datos de supervivencia actualizados y replicados en la red VITAL NEXUS.');
  }
}