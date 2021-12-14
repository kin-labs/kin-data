import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WebLayoutFeatureComponent } from './web-layout-feature.component'

@NgModule({
  declarations: [WebLayoutFeatureComponent],
  exports: [WebLayoutFeatureComponent],
  imports: [CommonModule],
})
export class WebLayoutFeatureModule {}
