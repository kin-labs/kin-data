import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'

@Component({
  selector: 'ui-page',
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <ng-content></ng-content>
    </div>
  `,
})
export class UiPageComponent {}

@NgModule({
  imports: [CommonModule],
  declarations: [UiPageComponent],
  exports: [UiPageComponent],
})
export class UiPageComponentModule {}
