import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment'; // Asegúrate de ajustar esta ruta

// --- INTERFACES BÁSICAS ---
// Estas interfaces te ayudarán con el tipado estricto en tus componentes
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Ahora la URL base viene del archivo de entorno (environment.ts)
  private baseUrl = environment.apiUrl; 

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true 
  };

  constructor(private http: HttpClient) {}

  // ==========================================
  // --- ADMINISTRADORES ---
  // ==========================================
  loginAdmin(credenciales: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/administradores/login`, credenciales, this.httpOptions);
  }
  
  logoutAdmin(): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/administradores/logout`, {}, this.httpOptions);
  }
  
  getAdminProfile(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/administradores/me`, this.httpOptions);
  }

  registrarAdmin(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/administradores`, datos, this.httpOptions);
  }

  // ==========================================
  // --- PACIENTES ---
  // ==========================================
  getPacientes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/pacientes`, this.httpOptions);
  }
  
  getPacienteById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/pacientes/${id}`, this.httpOptions);
  }
  
  // ¡CORRECCIÓN CRÍTICA! 
  // Ahora delega la búsqueda al backend para evitar colapsar la memoria del navegador.
  getPacienteByNss(curp_ssn: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/pacientes/curp/${curp_ssn}`, this.httpOptions);
  }

  registrarPaciente(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/pacientes`, datos, this.httpOptions);
  }

  // ==========================================
  // --- EXPEDIENTES ---
  // ==========================================
  getHistorialPaciente(curp_ssn: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/expedientes/paciente/curp/${curp_ssn}`, this.httpOptions);
  }
  
  registrarConsulta(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/expedientes`, datos, this.httpOptions);
  }

  // ==========================================
  // --- MÉDICOS ---
  // ==========================================
  getMedicos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/medicos`, this.httpOptions);
  }

  registrarMedico(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/medicos`, datos, this.httpOptions);
  }

  // ==========================================
  // --- MEDICAMENTOS Y RECETAS ---
  // ==========================================
  getCatalogoMedicamentos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/medicamentos`, this.httpOptions);
  }

  registrarMedicamento(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/medicamentos`, datos, this.httpOptions);
  }
  
  registrarReceta(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/recetas`, datos, this.httpOptions);
  }

  // ==========================================
  // --- INVENTARIOS ---
  // ==========================================
  getInventarios(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/inventarios`, this.httpOptions);
  }

  registrarInventario(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/inventarios`, datos, this.httpOptions);
  }

  // ==========================================
  // --- ESTABLECIMIENTOS ---
  // ==========================================
  getEstablecimientos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/establecimientos`, this.httpOptions);
  }

  registrarEstablecimiento(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/establecimientos`, datos, this.httpOptions);
  }

  // ==========================================
  // --- NODOS DE INFRAESTRUCTURA ---
  // ==========================================
  getNodos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/nodos`, this.httpOptions);
  }

  registrarNodo(datos: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/nodos`, datos, this.httpOptions);
  }
}