import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'

@Component({
  selector: 'kre-kre-stats-list',
  template: `
    <ui-page>
      <p>kre-stats-list works!</p>
    </ui-page>
  `,
  styles: [],
})
export class KreStatsListComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: KreStatsListComponent,
      },
    ]),
    UiPageComponentModule,
  ],
  declarations: [KreStatsListComponent],
  exports: [KreStatsListComponent],
})
export class KreStatsListComponentModule {}
