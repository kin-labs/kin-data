import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AboutFeatureComponent } from './about-feature.component'

describe('AboutFeatureComponent', () => {
  let component: AboutFeatureComponent
  let fixture: ComponentFixture<AboutFeatureComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutFeatureComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutFeatureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
