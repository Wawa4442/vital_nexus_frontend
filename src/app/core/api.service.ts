import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Aquí irá la URL de tu API Node/PostgreSQL
  private baseUrl = 'http://localhost:3000/api';

  constructor() { }

  // Simulación de llamada a V_EXPEDIENTE
  obtenerExpedientePaciente(idPaciente: string) {
    console.log(`Buscando fragmentos para el paciente ${idPaciente}...`);
    // return this.http.get(`${this.baseUrl}/expedientes/${idPaciente}`);
  }

  // Simulación de inserción en tabla EXPEDIENTE
  registrarConsulta(datosConsulta: any) {
    console.log('Sincronizando consulta en el nodo correspondiente...', datosConsulta);
    // return this.http.post(`${this.baseUrl}/expedientes`, datosConsulta);
  }
  
  // Simulación de búsqueda global de emergencia
  buscarDatosSupervivencia(curp: string) {
    console.log('Realizando consulta de baja latencia en nodos replicados...');
  }
}