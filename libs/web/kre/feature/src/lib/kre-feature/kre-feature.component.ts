import { Component, OnInit, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'kre-kre-feature',
  template: ` <p>kre-feature works!</p> `,
  styles: [],
})
export class KreFeatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [KreFeatureComponent],
  exports: [KreFeatureComponent],
})
export class KreFeatureComponentModule {}
