import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { WebShellFeatureModule } from '@kin-data/web/shell/feature'

import { AppComponent } from './app.component'

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, WebShellFeatureModule],
})
export class AppModule {}
