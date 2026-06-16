import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultas.html',
  styleUrls: ['./consultas.css']
})
export class Consultas {
  busquedaCurp = '';
  pacienteEncontrado: any = null;

  nuevaConsulta = {
    motivo_consulta: '',
    sintomas: '',
    diagnostico: '',
    nodoActual: 'Nodo Norte' // ID_NODO = 1
  };

  buscarPaciente() {
    // Aquí llamarías al ApiService
    if (this.busquedaCurp.trim() !== '') {
      this.pacienteEncontrado = {
        id_paciente: '1d604da9-9a81-4ba9-80c2-de3375d59b40', //
        nombre: 'José Eduardo Gómez', //
        alergias: 'Penicilina'
      };
    }
  }

  guardarConsulta() {
    console.log('Guardando en EXPEDIENTE...', this.nuevaConsulta);
    alert('Consulta registrada y sincronizada en la red distribuida.');
    this.nuevaConsulta.motivo_consulta = '';
    this.nuevaConsulta.sintomas = '';
    this.nuevaConsulta.diagnostico = '';
  }
}