import { Injectable } from '@angular/core'
import { KreStat, WebCoreDataAccessService } from '@kin-data/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap } from 'rxjs'

interface WebKreDataAccessState {
  error?: unknown
  loading: boolean
  stats?: KreStat[] | null
}

@Injectable({ providedIn: 'root' })
export class WebKreDataAccessStore extends ComponentStore<WebKreDataAccessState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
    this.initializeEffect()
  }

  readonly error$ = this.select((s) => s.error)
  readonly loading$ = this.select((s) => s.loading)
  readonly stats$ = this.select((s) => s.stats)
  readonly vm$ = this.select(this.error$, this.loading$, this.stats$, (error, loading, stats) => ({
    error,
    loading,
    stats,
  }))

  readonly initializeEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.data.kreStatList().pipe(
          tapResponse(
            (res) => {
              this.patchState({ stats: res.data?.stats, loading: false })
            },
            (error) => {
              this.patchState({ error, loading: false })
            },
          ),
        ),
      ),
    ),
  )
}
