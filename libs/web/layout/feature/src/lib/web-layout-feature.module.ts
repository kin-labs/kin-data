import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LayoutFooterComponentModule, LayoutHeaderComponentModule } from '@kin-data/web/layout/ui'
import { WebLayoutFeatureComponent } from './web-layout-feature.component'

@NgModule({
  declarations: [WebLayoutFeatureComponent],
  exports: [WebLayoutFeatureComponent],
  imports: [CommonModule, LayoutFooterComponentModule, LayoutHeaderComponentModule, RouterModule],
})
export class WebLayoutFeatureModule {}
