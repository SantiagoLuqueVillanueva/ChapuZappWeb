import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex min-h-screen bg-background">
      <!-- Panel izquierdo verde (visible en lg+) -->
      <aside
        class="relative hidden w-1/2 flex-col justify-between bg-primary/40 p-10 lg:flex xl:p-14"
      >
        <div class="space-y-12">
          <a routerLink="/" class="inline-block">
            <img src="/images/logo-horizontal.svg" alt="ChapuZapp" class="h-8 w-auto" />
          </a>

          <div class="max-w-md space-y-4">
            <h2
              class="font-display text-display font-bold tracking-tight text-ink text-4xl leading-tight"
            >
              Arreglos de confianza en tu barrio
            </h2>
            <p class="text-body text-ink/80 leading-relaxed">
              Más de 120 profesionales verificados en Málaga. Reserva, chatea y valora, todo en un
              sitio.
            </p>
          </div>
        </div>

        <!-- Tarjeta testimonio de Figma -->
        <div class="max-w-md rounded-2xl bg-white p-5 shadow-xs border border-line/60">
          <div class="flex items-center gap-1 text-[#2f9999] text-xs">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="mt-2 text-body italic text-ink">
            "Javier vino el mismo día y me cambió el grifo en media hora. Reservar fue facilísimo."
          </p>
          <div class="mt-4 flex items-center gap-3">
            <div
              class="flex size-9 items-center justify-center rounded-full bg-primary-soft font-display text-chip font-bold text-ink"
            >
              AG
            </div>
            <div>
              <p class="text-card-title font-semibold text-ink leading-none">Ana García</p>
              <p class="text-tiny text-muted">Campanillas, Málaga</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- Panel derecho: formulario (Login / Registro) -->
      <main class="flex flex-1 flex-col justify-between p-6 sm:p-10 lg:p-14">
        <!-- Logo en móvil / tablet -->
        <div class="lg:hidden mb-6">
          <a routerLink="/" class="inline-block">
            <img src="/images/logo-horizontal.svg" alt="ChapuZapp" class="h-8 w-auto" />
          </a>
        </div>

        <div class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
          <router-outlet />
        </div>

        <div class="mt-6 text-center text-tiny text-muted">
          © {{ currentYear }} ChapuZapp. Todos los derechos reservados.
        </div>
      </main>
    </div>
  `,
})
export class AuthLayoutComponent {
  readonly currentYear = new Date().getFullYear();
}
