import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta inicial (Landing Page)
  {
    path: '',
    loadComponent: () => import('./features/inicio/inicio').then(m => m.Inicio)
  },
  // Portal Paciente
  {
    path: 'paciente/historial',
    loadComponent: () => import('./features/paciente/historial/historial').then(m => m.Historial)
  },
  // Portal Médico
  {
    path: 'medico/consultas',
    loadComponent: () => import('./features/medico/consultas/consultas').then(m => m.Consultas)
  },
  // --- NUEVAS RUTAS ---
  // Login Administrativo
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login').then(m => m.Login)
  },
  // Dashboard DBA
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./features/admin/dashboard').then(m => m.Dashboard)
  },
  // Redirección por defecto
  {
    path: '**',
    redirectTo: ''
  }
];