import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service'; // Ajusta la ruta correcta

@Component({
  selector: 'app-admin-nodos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nodos.html',
  styleUrls: ['./nodos.css']
})
export class Nodos implements OnInit {
  nodos: any[] = [];
  cargando = true;

  // Reglas de Minitérminos (Se quedan estáticas porque son políticas de configuración)
  reglasFragmentacion = [
    { tabla: 'NODO', predicado: 'P1 = id_nodo = 1', fragmento: 'F1_Norte', nodoAsignado: 'Nodo 1' },
    { tabla: 'PACIENTE', predicado: "M1 = ciudad_residencia = 'Chicopee' AND genero = 'F'", fragmento: 'F1_Pacientes', nodoAsignado: 'Nodo 2' },
    { tabla: 'EXPEDIENTE', predicado: "M1 = motivo_consulta = 'Emergencia'", fragmento: 'F_Critico', nodoAsignado: 'Replicación Global (Todos)' }
  ];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarNodos();
  }

  cargarNodos() {
    this.cargando = true;
    this.apiService.getNodos().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          // Mapeamos los datos reales de la BD y les inyectamos métricas simuladas para la UI
          this.nodos = res.data.map((nodoDb: any) => ({
            id: nodoDb.id_nodo,
            region: nodoDb.nombre_region,
            ubicacion: nodoDb.ubicacion_geografica,
            ip: nodoDb.ip_servidor,
            // Métricas visuales (simuladas hasta que tengas un endpoint de telemetría)
            tipo: nodoDb.id_nodo === 1 ? 'Maestro' : 'Replica',
            estado: 'Online', 
            latencia: Math.floor(Math.random() * 40) + 10, // Genera latencia entre 10ms y 50ms
            sync: 100
          }));
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar nodos', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  forzarSincronizacion(idNodo: number) {
    console.log(`Forzando volcado de transacciones (Commit) hacia el Nodo ${idNodo}...`);
    // Aquí a futuro podrías llamar a un endpoint: this.apiService.sincronizarNodo(idNodo)
    alert(`Señal de sincronización enviada al Nodo ${idNodo}. Reduciendo latencia de fragmentos...`);
  }
}