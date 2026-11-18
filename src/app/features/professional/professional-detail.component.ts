import { Component, input } from '@angular/core';

@Component({
  selector: 'app-professional-detail',
  standalone: true,
  template: `
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 class="font-display text-h1 font-bold text-ink">Perfil del profesional</h1>
      <p class="mt-2 text-body text-muted">
        Página provisional del perfil del profesional con ID:
        <span class="font-semibold text-ink">{{ id() }}</span>
      </p>
    </div>
  `,
})
export class ProfessionalDetailComponent {
  id = input<string>('');
}
