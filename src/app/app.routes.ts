import { Routes } from '@angular/router';
import { DesignSystemComponent } from './features/design-system/design-system.component';

export const routes: Routes = [
  { path: '', redirectTo: 'design-system', pathMatch: 'full' },
  { path: 'design-system', component: DesignSystemComponent },
];
