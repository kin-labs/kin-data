import { Injectable } from '@angular/core'
import { ComponentStore } from '@ngrx/component-store'

interface WebLayoutFeatureState {
  name: string
}

@Injectable()
export class WebLayoutFeatureStore extends ComponentStore<WebLayoutFeatureState> {
  constructor() {
    super({ name: 'Kin Data' })
  }

  readonly name$ = this.select((s) => s.name)
  readonly vm$ = this.select(this.name$, (name) => ({ name }))
}
