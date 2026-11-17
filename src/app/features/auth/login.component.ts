import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-4">
      <h1 class="font-display text-h1 font-bold text-ink">Iniciar sesión</h1>
      <p class="text-body text-muted">Página provisional de inicio de sesión.</p>
      <div class="pt-2 text-caption text-muted">
        ¿No tienes cuenta?
        <a routerLink="/registro" class="font-semibold text-accent hover:underline">Regístrate</a>
      </div>
    </div>
  `,
})
export class LoginComponent {}
