import { Injectable } from '@angular/core'
import { WebKreDataAccessStore } from '@kin-data/web/kre/data-access'
import { ComponentStore } from '@ngrx/component-store'

interface KreStatsListState {
  loading: boolean
}

@Injectable()
export class KreStatsListStore extends ComponentStore<KreStatsListState> {
  constructor(private readonly data: WebKreDataAccessStore) {
    super({ loading: false })
  }

  readonly vm$ = this.select(this.data.vm$, ({ error, loading, stats }) => ({ error, loading, stats }))
}
