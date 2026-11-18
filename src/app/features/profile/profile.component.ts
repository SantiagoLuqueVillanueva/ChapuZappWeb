import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Perfil</h1>
      <p class="mt-2 text-body text-muted">
        Página provisional para ver y editar tus datos de usuario.
      </p>
    </div>
  `,
})
export class ProfileComponent {}
