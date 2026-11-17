import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div class="mb-6">
        <a routerLink="/">
          <img src="/images/logo-horizontal.svg" alt="ChapuZapp" class="h-9 w-auto" />
        </a>
      </div>
      <div class="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
        <router-outlet />
      </div>
    </div>
  `,
})
export class AuthLayoutComponent {}
