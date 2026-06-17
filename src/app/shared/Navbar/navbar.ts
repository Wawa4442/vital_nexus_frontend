import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  // IMPORTANTE: Agregamos CommonModule para poder usar *ngIf en el HTML
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    // Verificamos si estamos en el navegador para evitar errores con localStorage en SSR
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Getter dinámico para saber si hay un paciente activo en la sesión actual
  get tieneSesionActiva(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('paciente_nss');
    }
    return false;
  }

  cerrarExpediente() {
    if (this.isBrowser) {
      // Limpiamos todo el rastro del paciente activo en la memoria local
      localStorage.removeItem('paciente_nss');
      localStorage.removeItem('paciente_id');
      localStorage.removeItem('expediente_actual');
      
      // Redirigimos a la página de inicio o portal
      this.router.navigate(['/']);
    }
  }
}