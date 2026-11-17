import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-4">
      <h1 class="font-display text-h1 font-bold text-ink">Crear cuenta</h1>
      <p class="text-body text-muted">Página provisional de registro de usuario.</p>
      <div class="pt-2 text-caption text-muted">
        ¿Ya tienes cuenta?
        <a routerLink="/login" class="font-semibold text-accent hover:underline">Inicia sesión</a>
      </div>
    </div>
  `,
})
export class RegisterComponent {}
