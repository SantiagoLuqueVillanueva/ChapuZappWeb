import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Búsqueda de profesionales</h1>
      <p class="mt-2 text-body text-muted">
        Página provisional para buscar profesionales y filtrar resultados.
      </p>
    </div>
  `,
})
export class SearchComponent {}
