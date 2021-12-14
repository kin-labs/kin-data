import { Component } from '@angular/core'
import { WebLayoutFeatureStore } from './web-layout-feature.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div>{{ vm | json }}</div>
    </ng-container>
  `,
  providers: [WebLayoutFeatureStore],
})
export class WebLayoutFeatureComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: WebLayoutFeatureStore) {}
}
