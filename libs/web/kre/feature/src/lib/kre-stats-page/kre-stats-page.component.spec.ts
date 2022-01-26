import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KreStatsPageComponent } from './kre-stats-page.component'

describe('KreStatsPageComponent', () => {
  let component: KreStatsPageComponent
  let fixture: ComponentFixture<KreStatsPageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KreStatsPageComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KreStatsPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
