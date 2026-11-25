import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { profesionalGuard } from './core/guards/professional.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'buscar',
        loadComponent: () =>
          import('./features/search/search.component').then((m) => m.SearchComponent),
      },
      {
        path: 'profesional/:id',
        loadComponent: () =>
          import('./features/professional/professional-detail.component').then(
            (m) => m.ProfessionalDetailComponent,
          ),
      },
      {
        path: 'profesional/:id/reservar',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/booking/booking.component').then((m) => m.BookingComponent),
      },
      {
        path: 'mis-citas',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent,
          ),
      },
      {
        path: 'mensajes',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/messages/messages.component').then((m) => m.MessagesComponent),
      },
      {
        path: 'perfil',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'design-system',
        loadComponent: () =>
          import('./features/design-system/design-system.component').then(
            (m) => m.DesignSystemComponent,
          ),
      },
      {
        path: 'agenda',
        canActivate: [authGuard, profesionalGuard],
        loadComponent: () =>
          import('./features/agenda/agenda.component').then((m) => m.AgendaComponent),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'registro',
        loadComponent: () =>
          import('./features/auth/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: '**',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./layout/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
];
