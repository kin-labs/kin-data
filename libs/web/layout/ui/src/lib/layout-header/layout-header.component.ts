import { CommonModule } from '@angular/common'
import { Component, Input, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

export interface LayoutHeaderLink {
  label: string
  path: string
}

@Component({
  selector: 'layout-header',
  template: `
    <header class="bg-gray-800">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div class="w-full py-6 flex items-center justify-between border-b border-primary-500 lg:border-none">
          <div class="flex items-center">
            <a routerLink="/" *ngIf="logo">
              <span class="sr-only">Kin Logo</span>
              <img class="h-10 w-auto" [attr.src]="logo" alt="" />
            </a>
            <div class="hidden ml-10 space-x-8 lg:block">
              <ng-container *ngFor="let link of links">
                <a [routerLink]="link.path" class="text-base font-medium text-white hover:text-primary-50">
                  {{ link.label }}
                </a>
              </ng-container>
            </div>
          </div>
        </div>
        <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <ng-container *ngFor="let link of links">
            <a [routerLink]="link.path" class="text-base font-medium text-white hover:text-primary-50">{{
              link.label
            }}</a>
            <a [routerLink]="link.path" class="text-base font-medium text-white hover:text-primary-50"
              >{{ link.label }}
            </a>
          </ng-container>
        </div>
      </nav>
    </header>
  `,
})
export class LayoutHeaderComponent {
  @Input() links: LayoutHeaderLink[] = []
  @Input() logo: string | undefined
}

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [LayoutHeaderComponent],
  exports: [LayoutHeaderComponent],
})
export class LayoutHeaderComponentModule {}
