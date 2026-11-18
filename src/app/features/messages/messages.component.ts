import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Mensajes</h1>
      <p class="mt-2 text-body text-muted">
        Página provisional para el chat y comunicación con manitas.
      </p>
    </div>
  `,
})
export class MessagesComponent {}
