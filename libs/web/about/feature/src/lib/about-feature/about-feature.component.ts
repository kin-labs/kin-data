import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'

@Component({
  template: `
    <ui-page>
      <p>about-feature works!</p>
    </ui-page>
  `,
})
export class AboutFeatureComponent {}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AboutFeatureComponent,
      },
    ]),
    UiPageComponentModule,
  ],
  declarations: [AboutFeatureComponent],
  exports: [AboutFeatureComponent],
})
export class AboutFeatureComponentModule {}
