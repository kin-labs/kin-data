import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KreStatsDetailComponent } from './kre-stats-detail.component'

describe('KreStatsDetailComponent', () => {
  let component: KreStatsDetailComponent
  let fixture: ComponentFixture<KreStatsDetailComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KreStatsDetailComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KreStatsDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
