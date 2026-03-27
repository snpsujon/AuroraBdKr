import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'telecom-travel',
    loadComponent: () => import('./features/telecom-travel/telecom-travel.component').then(m => m.TelecomTravelComponent)
  },
  {
    path: 'skincare',
    loadComponent: () => import('./features/skincare/skincare.component').then(m => m.SkincareComponent)
  },
  {
    path: 'global-food',
    loadComponent: () => import('./features/global-food/global-food.component').then(m => m.GlobalFoodComponent)
  },
  {
    path: 'real-estate',
    loadComponent: () => import('./features/real-estate/real-estate.component').then(m => m.RealEstateComponent)
  },
  {
    path: 'consultancy',
    loadComponent: () => import('./features/consultancy/consultancy.component').then(m => m.ConsultancyComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
