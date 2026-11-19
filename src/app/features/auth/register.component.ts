import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-6">
      <div class="space-y-1 text-center sm:text-left">
        <h1 class="font-display text-3xl font-bold tracking-tight text-ink">Crear cuenta</h1>
        <p class="text-body text-muted">Regístrate gratis y reserva en minutos.</p>
      </div>

      <!-- Selector de Rol estilo Figma (Soy cliente / Soy profesional) -->
      <div class="flex rounded-xl border border-line bg-surface p-1">
        <button
          type="button"
          (click)="userType.set('cliente')"
          [class]="
            userType() === 'cliente'
              ? 'bg-white font-semibold text-ink shadow-xs'
              : 'text-muted hover:text-ink'
          "
          class="flex-1 cursor-pointer rounded-lg py-2 text-center font-display text-caption transition-all"
        >
          Soy cliente
        </button>
        <button
          type="button"
          (click)="userType.set('profesional')"
          [class]="
            userType() === 'profesional'
              ? 'bg-white font-semibold text-ink shadow-xs'
              : 'text-muted hover:text-ink'
          "
          class="flex-1 cursor-pointer rounded-lg py-2 text-center font-display text-caption transition-all"
        >
          Soy profesional
        </button>
      </div>

      <form (submit)="$event.preventDefault()" class="space-y-3.5">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div class="space-y-1.5">
            <label for="reg-name" class="font-display text-caption font-medium text-ink">
              Nombre y apellidos
            </label>
            <input
              id="reg-name"
              type="text"
              placeholder="Ana García"
              class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
            />
          </div>
          <div class="space-y-1.5">
            <label for="reg-location" class="font-display text-caption font-medium text-ink">
              Barrio o código postal
            </label>
            <input
              id="reg-location"
              type="text"
              placeholder="29010"
              class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label for="reg-email" class="font-display text-caption font-medium text-ink">
            Correo electrónico
          </label>
          <input
            id="reg-email"
            type="email"
            placeholder="ana@correo.com"
            class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label for="reg-password" class="font-display text-caption font-medium text-ink">
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div class="pt-1">
          <label class="flex cursor-pointer items-start gap-2.5">
            <input type="checkbox" checked class="mt-1 size-4 rounded accent-ink cursor-pointer" />
            <span class="text-caption text-muted">
              Acepto los términos y la política de privacidad
            </span>
          </label>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full cursor-pointer rounded-xl bg-ink py-3 font-display text-card-title font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Crear cuenta
          </button>
        </div>
      </form>

      <div class="text-center text-caption text-muted">
        ¿Ya tienes cuenta?
        <a routerLink="/login" class="font-semibold text-accent hover:underline"> Inicia sesión </a>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  readonly userType = signal<'cliente' | 'profesional'>('cliente');
}
