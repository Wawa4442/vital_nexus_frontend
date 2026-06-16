import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medico-receta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receta.html',
  styleUrls: ['./receta.css']
})
export class Receta {
  // Simulando datos del Expediente actual (EXPEDIENTE)
  pacienteActual = {
    nombre: 'José Eduardo Gómez',
    idExpediente: 'd0c40d10-8d87-447e-836e-99d26ad52ea5',
    diagnostico: 'Acute bronchitis (disorder)'
  };

  // Catálogo simulado (MEDICAMENTO)
  catalogoMedicamentos = [
    { codigo: '389221', nombre: 'Etonogestrel 68 MG Drug Implant', requiereReceta: true },
    { codigo: '102938', nombre: 'Ibuprofeno 400 MG', requiereReceta: false },
    { codigo: '482910', nombre: 'Azitromicina 500 MG', requiereReceta: true }
  ];

  nuevaReceta = {
    codigo_medicamento: '',
    instrucciones: '',
    duracion: '',
    estado_surtido: 'PENDIENTE'
  };

  generarPrescripcion() {
    console.log('Insertando en tabla RECETA asociada al expediente...', this.nuevaReceta);
    alert('Receta generada exitosamente. El paciente puede surtirla en cualquier nodo de la red.');
    // Limpiar formulario
    this.nuevaReceta.codigo_medicamento = '';
    this.nuevaReceta.instrucciones = '';
    this.nuevaReceta.duracion = '';
  }
}