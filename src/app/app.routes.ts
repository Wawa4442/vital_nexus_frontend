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
  // Nuevas rutas del Portal Paciente
  {
    path: 'paciente/perfil',
    loadComponent: () => import('./features/paciente/perfil/perfil').then(m => m.Perfil)
  },
  {
    path: 'paciente/alertas',
    loadComponent: () => import('./features/paciente/alertas/alertas').then(m => m.Alertas)
  },
  // Nuevas rutas del Portal Médico
  {
    path: 'medico/receta',
    loadComponent: () => import('./features/medico/receta/receta').then(m => m.Receta)
  },
  {
    path: 'medico/tendencias',
    loadComponent: () => import('./features/medico/tendencias/tendencias').then(m => m.Tendencias)
  },
  {
    path: 'auth/portal',
    loadComponent: () => import('./features/auth/portal-login/portal-login').then(m => m.PortalLogin)
  },
  {
    path: 'admin/nodos',
    loadComponent: () => import('./features/admin/nodos/nodos').then(m => m.Nodos)
  },
  // Redirección por defecto
  {
    path: '**',
    redirectTo: ''
  }
];