import { Component, Input } from '@angular/core'
import { ChartData, ChartOptions } from 'chart.js'

@Component({
  selector: 'ui-chart',
  template: `
    <ng-container *ngIf="data && options">
      <div class="hidden md:block">
        <ngx-chartjs [height]="150" type="line" [data]="data" [options]="options"></ngx-chartjs>
      </div>
      <div class="block md:hidden">
        <ngx-chartjs [height]="400" type="line" [data]="data" [options]="options"></ngx-chartjs>
      </div>
      <!--      <pre>{{ data | json }}</pre>-->
    </ng-container>
  `,
})
export class WebUiChartComponent {
  @Input() data: ChartData | undefined
  @Input() options: ChartOptions | undefined
}
