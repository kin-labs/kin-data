import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'

@Component({
  template: `
    <ui-page>
      <router-outlet></router-outlet>
    </ui-page>
  `,
})
export class KreStatsPageComponent {}
