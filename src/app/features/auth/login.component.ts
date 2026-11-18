import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <div class="space-y-6">
      <div class="space-y-1">
        <h1 class="font-display text-h1 font-bold text-ink">Iniciar sesión</h1>
        <p class="text-body text-muted">Accede a tu cuenta de ChapuZapp</p>
      </div>

      <form (submit)="$event.preventDefault()" class="space-y-4">
        <div class="space-y-1.5">
          <label for="login-email" class="font-display text-card-title font-medium text-ink">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="ejemplo@correo.com"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label for="login-password" class="font-display text-card-title font-medium text-ink">
              Contraseña
            </label>
            <a
              href="#"
              (click)="$event.preventDefault()"
              class="text-caption font-medium text-accent hover:underline"
            >
              ¿Olvidaste la contraseña?
            </a>
          </div>
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-body text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
        </div>

        <div class="pt-2">
          <app-button variant="primary" size="md" class="w-full block [&>button]:w-full">
            Iniciar sesión
          </app-button>
        </div>
      </form>

      <div class="border-t border-line pt-4 text-center text-body text-muted">
        ¿No tienes cuenta todavía?
        <a routerLink="/registro" class="font-semibold text-accent hover:underline">
          Regístrate gratis
        </a>
      </div>
    </div>
  `,
})
export class LoginComponent {}
