import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ChartjsModule } from '@ctrl/ngx-chartjs'
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { WebUiChartComponent } from './web-ui-chart.component'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
)

@NgModule({
  declarations: [WebUiChartComponent],
  exports: [ChartjsModule, WebUiChartComponent],
  imports: [CommonModule, ChartjsModule],
})
export class WebUiChartModule {}
