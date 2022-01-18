import { ComponentFixture, TestBed } from '@angular/core/testing'

import { KreFeatureComponent } from './kre-feature.component'

describe('KreFeatureComponent', () => {
  let component: KreFeatureComponent
  let fixture: ComponentFixture<KreFeatureComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KreFeatureComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(KreFeatureComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
