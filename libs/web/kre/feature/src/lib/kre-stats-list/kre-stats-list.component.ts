import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { KreStatListModule } from '@kin-data/web/kre/ui'
import { KreStatsListStore } from './kre-stats-list.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <kre-stat-list [stats]="vm.stats"></kre-stat-list>
      <pre>{{ vm | json }}</pre>
    </ng-container>
  `,
  providers: [KreStatsListStore],
})
export class KreStatsListComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: KreStatsListStore) {}
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: KreStatsListComponent,
      },
    ]),
    KreStatListModule,
  ],
  declarations: [KreStatsListComponent],
  exports: [KreStatsListComponent],
})
export class KreStatsListComponentModule {}
