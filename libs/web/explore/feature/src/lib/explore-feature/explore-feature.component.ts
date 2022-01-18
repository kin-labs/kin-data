import { Component, OnInit, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'explore-explore-feature',
  template: ` <p>explore-feature works!</p> `,
  styles: [],
})
export class ExploreFeatureComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [ExploreFeatureComponent],
  exports: [ExploreFeatureComponent],
})
export class ExploreFeatureComponentModule {}
