import { Component, OnInit, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'sdks-sdks-feature',
  template: ` <p>sdks-feature works!</p> `,
  styles: [],
})
export class SdksFeatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [SdksFeatureComponent],
  exports: [SdksFeatureComponent],
})
export class SdksFeatureComponentModule {}
