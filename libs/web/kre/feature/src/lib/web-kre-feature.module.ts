import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('./kre-stats-list/kre-stats-list.component').then(
            ({ KreStatsListComponentModule }) => KreStatsListComponentModule,
          ),
      },
      {
        path: ':stats',
        loadChildren: () =>
          import('./kre-stats-detail/kre-stats-detail.component').then(
            ({ KreStatsDetailComponentModule }) => KreStatsDetailComponentModule,
          ),
      },
    ]),
  ],
})
export class WebKreFeatureModule {}
