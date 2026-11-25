import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profesionalGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.usuario()?.rol === 'PROFESIONAL') {
    return true;
  }

  return router.createUrlTree(['/']);
};
