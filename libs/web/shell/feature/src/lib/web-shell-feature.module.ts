import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebLayoutFeatureComponent } from '@kin-data/web/layout/feature'

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: WebLayoutFeatureComponent,
        children: [
          //
        ],
      },
    ]),
  ],
})
export class WebShellFeatureModule {}
