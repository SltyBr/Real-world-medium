import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./routes/home/home').then(comp => comp.Home),
  },
  {
    path: 'settings',
    loadComponent: () => import('./routes/settings/settings').then(comp => comp.Settings),
  },
  {
    path: 'editor',
    loadComponent: () => import('./routes/editor/editor').then(comp => comp.Editor),
  },
  {
    path: 'profile/:userName',
    loadComponent: () => import('./routes/profile/profile').then(comp => comp.Profile),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./routes/auth/sign-up').then(c => c.SignUp),
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./routes/auth/sign-in').then(c => c.SignIn),
  },
  {
    path: '**',
    loadComponent: () => import('./routes/not-found/not-found').then(comp => comp.NotFound)
  }
];
