import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="space-y-1">
        <h1 class="font-display text-h1 font-bold text-ink">Crear cuenta</h1>
        <p class="text-body text-muted">Únete a ChapuZapp como cliente o profesional</p>
      </div>

      <form (submit)="$event.preventDefault()" class="space-y-4">
        <div class="space-y-1.5">
          <label for="reg-name" class="font-display text-card-title font-medium text-ink">
            Nombre completo
          </label>
          <input
            id="reg-name"
            type="text"
            placeholder="Juan Pérez"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label for="reg-email" class="font-display text-card-title font-medium text-ink">
            Correo electrónico
          </label>
          <input
            id="reg-email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label for="reg-password" class="font-display text-card-title font-medium text-ink">
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <span class="font-display text-card-title font-medium text-ink">Tipo de cuenta</span>
          <div class="grid grid-cols-2 gap-3">
            <label
              for="rol-cliente"
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-surface p-3 text-body font-medium text-ink hover:border-accent"
            >
              <input
                id="rol-cliente"
                type="radio"
                name="rol"
                value="CLIENTE"
                checked
                class="accent-accent"
              />
              <span>Cliente</span>
            </label>
            <label
              for="rol-profesional"
              class="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-surface p-3 text-body font-medium text-ink hover:border-accent"
            >
              <input
                id="rol-profesional"
                type="radio"
                name="rol"
                value="PROFESIONAL"
                class="accent-accent"
              />
              <span>Profesional</span>
            </label>
          </div>
        </div>

        <div class="pt-2">
          <app-button variant="primary" size="md" class="w-full block [&>button]:w-full">
            Registrarse
          </app-button>
        </div>
      </form>

      <div class="border-t border-line pt-4 text-center text-body text-muted">
        ¿Ya tienes cuenta?
        <a routerLink="/login" class="font-semibold text-accent hover:underline"> Inicia sesión </a>
      </div>
    </div>
  `,
})
export class RegisterComponent {}
