import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KreStatsListComponent } from './kre-stats-list.component'

describe('KreStatsListComponent', () => {
  let component: KreStatsListComponent
  let fixture: ComponentFixture<KreStatsListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KreStatsListComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KreStatsListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
