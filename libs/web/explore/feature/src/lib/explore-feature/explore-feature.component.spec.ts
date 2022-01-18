import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ExploreFeatureComponent } from './explore-feature.component'

describe('ExploreFeatureComponent', () => {
  let component: ExploreFeatureComponent
  let fixture: ComponentFixture<ExploreFeatureComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExploreFeatureComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreFeatureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
