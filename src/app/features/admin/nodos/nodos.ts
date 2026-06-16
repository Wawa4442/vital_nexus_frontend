import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-nodos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nodos.html',
  styleUrls: ['./nodos.css']
})
export class Nodos {
  // Topología basada en la infraestructura distribuida
  nodos = [
    { id: 1, region: 'Norte', ubicacion: 'Aguascalientes', ip: '192.168.1.10', tipo: 'Maestro', estado: 'Online', latencia: 12, sync: 100 },
    { id: 2, region: 'Centro', ubicacion: 'Chicopee', ip: '192.168.1.20', tipo: 'Maestro', estado: 'Online', latencia: 18, sync: 99 },
    { id: 3, region: 'Bajío', ubicacion: 'Guanajuato', ip: '192.168.1.30', tipo: 'Replica', estado: 'Warning', latencia: 145, sync: 82 }
  ];

  // Reglas de Minitérminos y Predicados
  reglasFragmentacion = [
    { tabla: 'NODO', predicado: 'P1 = id_nodo = 1', fragmento: 'F1_Norte', nodoAsignado: 'Nodo 1' },
    { tabla: 'PACIENTE', predicado: "M1 = ciudad_residencia = 'Chicopee' AND genero = 'F'", fragmento: 'F1_Pacientes', nodoAsignado: 'Nodo 2' },
    { tabla: 'EXPEDIENTE', predicado: "M1 = motivo_consulta = 'Emergencia'", fragmento: 'F_Critico', nodoAsignado: 'Replicación Global (Todos)' }
  ];

  forzarSincronizacion(idNodo: number) {
    console.log(`Forzando volcado de transacciones (Commit) hacia el Nodo ${idNodo}...`);
    alert(`Señal de sincronización enviada al Nodo ${idNodo}. Reduciendo latencia de fragmentos...`);
  }
} 