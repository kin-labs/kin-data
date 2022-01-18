import { Component } from '@angular/core'
import { WebLayoutFeatureStore } from './web-layout-feature.store'

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="h-screen flex flex-col h-full justify-between">
        <layout-header [links]="vm.headerLinks" [logo]="vm.logo"></layout-header>
        <main class="flex-grow">
          <router-outlet></router-outlet>
        </main>
        <layout-footer [links]="vm.footerLinks"></layout-footer>
      </div>
    </ng-container>
  `,
  providers: [WebLayoutFeatureStore],
})
export class WebLayoutFeatureComponent {
  readonly vm$ = this.store.vm$
  constructor(private readonly store: WebLayoutFeatureStore) {}
}
