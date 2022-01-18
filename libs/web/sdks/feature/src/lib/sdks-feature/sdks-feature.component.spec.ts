import { ComponentFixture, TestBed } from '@angular/core/testing'

import { SdksFeatureComponent } from './sdks-feature.component'

describe('SdksFeatureComponent', () => {
  let component: SdksFeatureComponent
  let fixture: ComponentFixture<SdksFeatureComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SdksFeatureComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(SdksFeatureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
