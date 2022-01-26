import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'
import { KreStatsPageComponent } from './kre-stats-page/kre-stats-page.component'
import { WebKreFeatureEmbedModule } from './web-kre-feature-embed.module'

@NgModule({
  declarations: [KreStatsPageComponent],
  imports: [
    UiPageComponentModule,
    RouterModule.forChild([
      {
        path: '',
        component: KreStatsPageComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./web-kre-feature-embed.module').then(({ WebKreFeatureEmbedModule }) => WebKreFeatureEmbedModule),
          },
        ],
      },
    ]),
  ],
})
export class WebKreFeatureModule {}
