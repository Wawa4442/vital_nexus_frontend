import { Routes } from '@angular/router';

// TODO a futuro: Aquí importarás tus validadores de seguridad
// import { adminGuard } from './core/guards/admin.guard';
// import { pacienteGuard } from './core/guards/paciente.guard';

export const routes: Routes = [
  // --- INICIO ---
  { 
    path: '', 
    loadComponent: () => import('./features/inicio/inicio').then(m => m.Inicio),
    title: 'Vital Nexus | SNHCU'
  },
  
  // --- AUTENTICACIÓN ---
  { 
    path: 'auth/portal', 
    loadComponent: () => import('./features/auth/portal-login/portal-login').then(m => m.PortalLogin),
    title: 'Portal de Acceso | Vital Nexus'
  },
  { 
    path: 'auth/login', 
    loadComponent: () => import('./features/auth/login').then(m => m.Login),
    title: 'Acceso DBA | Vital Nexus'
  },

  // --- PORTAL PACIENTE ---
  { 
    path: 'paciente/historial', 
    loadComponent: () => import('./features/paciente/historial/historial').then(m => m.Historial),
    title: 'Mi Expediente | Paciente',
    // canActivate: [pacienteGuard] // <-- Aquí bloquearás la ruta en el futuro
  },
  { 
    path: 'paciente/perfil', 
    loadComponent: () => import('./features/paciente/perfil/perfil').then(m => m.Perfil),
    title: 'Perfil de Supervivencia'
  },
  { 
    path: 'paciente/alertas', 
    loadComponent: () => import('./features/paciente/alertas/alertas').then(m => m.Alertas),
    title: 'Geolocalización Sanitaria'
  },

  // --- PORTAL MÉDICO ---
  { 
    path: 'medico/consultas', 
    loadComponent: () => import('./features/medico/consultas/consultas').then(m => m.Consultas),
    title: 'Registro de Consultas | Médico'
  },
  { 
    path: 'medico/receta', 
    loadComponent: () => import('./features/medico/receta/receta').then(m => m.Receta),
    title: 'Recetario Electrónico'
  },
  { 
    path: 'medico/tendencias', 
    loadComponent: () => import('./features/medico/tendencias/tendencias').then(m => m.Tendencias),
    title: 'Tendencias Clínicas'
  },

  // --- INFRAESTRUCTURA (DBA) ---
  { 
    path: 'admin/dashboard', 
    loadComponent: () => import('./features/admin/dashboard').then(m => m.Dashboard),
    title: 'Dashboard DBA | Vital Nexus',
    // canActivate: [adminGuard]
  },
  { 
    path: 'admin/nodos', 
    loadComponent: () => import('./features/admin/nodos/nodos').then(m => m.Nodos),
    title: 'Topología de Nodos'
  },

  // --- RUTAS COMODÍN ---
  // Si el usuario escribe una URL que no existe, lo regresamos al inicio
  { 
    path: '**', 
    redirectTo: '' 
  }
];