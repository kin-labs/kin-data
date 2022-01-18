import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebLayoutFeatureComponent } from '@kin-data/web/layout/feature'

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
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
        ],
      },
    ]),
  ],
})
export class WebShellFeatureModule {}
