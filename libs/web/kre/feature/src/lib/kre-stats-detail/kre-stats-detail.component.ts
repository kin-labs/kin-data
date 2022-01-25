import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'

@Component({
  selector: 'kre-kre-stats-detail',
  template: `
    <ui-page>
      <p>kre-stats-detail works!</p>
    </ui-page>
  `,
  styles: [],
})
export class KreStatsDetailComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: KreStatsDetailComponent,
      },
    ]),
    UiPageComponentModule,
  ],
  declarations: [KreStatsDetailComponent],
  exports: [KreStatsDetailComponent],
})
export class KreStatsDetailComponentModule {}
