import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';
import { DesignSystemComponent } from './features/design-system/design-system.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'design-system', component: DesignSystemComponent },
  { path: '**', redirectTo: '' },
];
