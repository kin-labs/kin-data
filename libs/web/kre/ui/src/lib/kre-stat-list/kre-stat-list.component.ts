import { CommonModule } from '@angular/common'
import { Component, Input, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { KreStat } from '@kin-data/web/core/data-access'

@Component({
  selector: 'kre-stat-list',
  template: `
    <ng-container *ngIf="stats?.length">
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4 mb-6">
        <ng-container *ngFor="let stat of stats">
          <a
            [routerLink]="[stat?.id]"
            routerLinkActive="text-primary-500 border-primary-500 bg-gray-800"
            class="p-2 border border-gray-600 text-gray-500 rounded shadow text-xs flex items-center justify-center text-center"
          >
            <span>{{ stat?.title }}</span>
          </a>
        </ng-container>
      </div>
    </ng-container>
  `,
})
export class KreStatListComponent {
  @Input() stats: KreStat[] | null | undefined = []
}

@NgModule({
  declarations: [KreStatListComponent],
  exports: [KreStatListComponent],
  imports: [CommonModule, RouterModule],
})
export class KreStatListModule {}
