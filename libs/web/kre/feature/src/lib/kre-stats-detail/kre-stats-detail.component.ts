import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebUiChartModule } from '@kin-data/web/ui/chart'
import { KreStatsDetailStore } from './kre-stats-detail.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <!--      <pre>Chart: {{ vm?.chart || {} | json }}</pre>-->

      <div class="grid gap-4 lg:gap-6">
        <!--        <web-stats-grid-item [stat]="stat"></web-stats-grid-item>-->
        <div
          class="bg-gray-800 rounded-lg shadow-md md:shadow-lg p-4 flex flex-col space-y-4 md:space-y-8 overflow-hidden"
        >
          <div class="relative">
            <ui-chart [options]="vm.options" [data]="vm.chart"></ui-chart>
          </div>
        </div>
        <!--        <div-->
        <!--          class="bg-gray-800 rounded-lg shadow-md md:shadow-lg p-4 md:p-4 flex flex-col space-y-4 items-center justify-center"-->
        <!--        >-->
        <!--          <p class="text-xs text-gray-500" [innerHTML]="stat.description"></p>-->
        <!--          <code class="text-xs text-gray-500 font-bold"-->
        <!--          >Table: {{ stat?.table }} Items: {{ vm?.data?.datasets?.length }}-->
        <!--          </code>-->
        <!--        </div>-->
      </div>
    </ng-container>
  `,
  providers: [KreStatsDetailStore],
})
export class KreStatsDetailComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: KreStatsDetailStore) {}
}

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: KreStatsDetailComponent }]), WebUiChartModule],
  declarations: [KreStatsDetailComponent],
  exports: [KreStatsDetailComponent],
})
export class KreStatsDetailComponentModule {}
