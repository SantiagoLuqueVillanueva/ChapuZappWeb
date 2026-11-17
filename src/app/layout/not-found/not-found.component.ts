import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p class="font-display text-display font-extrabold text-accent">404</p>
      <h1 class="mt-2 font-display text-h1 font-bold text-ink">Página no encontrada</h1>
      <p class="mt-2 max-w-md text-body text-muted">
        Lo sentimos, no hemos podido encontrar la página que buscas. Puede que la dirección sea
        incorrecta o haya cambiado de lugar.
      </p>
      <div class="mt-6">
        <a
          routerLink="/"
          class="rounded-xl bg-ink px-6 py-3 font-display text-card-title font-semibold text-white transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
