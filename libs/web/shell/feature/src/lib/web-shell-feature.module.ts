import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { WebCoreFeatureModule } from '@kin-data/web/core/feature'
import { routes } from './web-shell-feature.routes'

@NgModule({
  exports: [RouterModule],
  imports: [WebCoreFeatureModule, RouterModule.forRoot(routes)],
})
export class WebShellFeatureModule {}
