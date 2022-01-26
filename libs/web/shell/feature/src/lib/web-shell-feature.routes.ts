import { Routes } from '@angular/router'
import { WebLayoutFeatureComponent } from '@kin-data/web/layout/feature'

export const routes: Routes = [
  {
    path: '',
    component: WebLayoutFeatureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () => import('@kin-data/web/home/feature').then((m) => m.HomeFeatureComponentModule),
      },
      {
        path: 'about',
        loadChildren: () => import('@kin-data/web/about/feature').then((m) => m.AboutFeatureComponentModule),
      },
      {
        path: 'kre',
        loadChildren: () => import('@kin-data/web/kre/feature').then((m) => m.WebKreFeatureModule),
      },
    ],
  },
  {
    path: 'embed',
    children: [
      {
        path: 'kre',
        loadChildren: () => import('@kin-data/web/kre/feature').then((m) => m.WebKreFeatureEmbedModule),
      },
    ],
  },
]
