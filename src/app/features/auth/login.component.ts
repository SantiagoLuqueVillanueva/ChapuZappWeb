import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="space-y-7">
      <div class="space-y-1.5 text-center sm:text-left">
        <h1 class="font-display text-3xl font-bold tracking-tight text-ink">Inicia sesión</h1>
        <p class="text-body text-muted">Accede para reservar profesionales cerca de ti.</p>
      </div>

      <form (submit)="$event.preventDefault()" class="space-y-4">
        <div class="space-y-1.5">
          <label for="login-email" class="font-display text-caption font-medium text-ink">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="ana@correo.com"
            class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
        </div>

        <div class="space-y-1.5">
          <label for="login-password" class="font-display text-caption font-medium text-ink">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="••••••••"
            class="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-body text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none"
          />
          <div class="text-right">
            <a
              href="#"
              (click)="$event.preventDefault()"
              class="text-caption font-medium text-accent hover:underline"
            >
              He olvidado mi contraseña
            </a>
          </div>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="w-full cursor-pointer rounded-xl bg-ink py-3 font-display text-card-title font-semibold text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Entrar
          </button>
        </div>

        <div class="relative py-2 text-center text-caption text-muted">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-line"></div>
          </div>
          <span class="relative bg-background px-3">O</span>
        </div>

        <button
          type="button"
          class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-line bg-white py-2.5 font-display text-card-title font-medium text-ink hover:bg-surface active:scale-[0.98]"
        >
          <svg class="size-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continuar con Google</span>
        </button>
      </form>

      <div class="text-center text-caption text-muted">
        ¿No tienes cuenta?
        <a routerLink="/registro" class="font-semibold text-accent hover:underline"> Regístrate </a>
      </div>
    </div>
  `,
})
export class LoginComponent {}
