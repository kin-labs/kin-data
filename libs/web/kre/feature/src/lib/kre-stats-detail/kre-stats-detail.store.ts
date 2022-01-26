import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { KreStat, KreStatType, WebCoreDataAccessService } from '@kin-data/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { ChartData, ChartOptions } from 'chart.js'
import { pluck, switchMap, tap } from 'rxjs'

interface KreStatsDetailState {
  chart?: ChartData
  error?: unknown
  loading: boolean
  options?: ChartOptions
  stat?: KreStat | null
}

function getOptions(title: string): ChartOptions {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  }
}

@Injectable()
export class KreStatsDetailStore extends ComponentStore<KreStatsDetailState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly route: ActivatedRoute) {
    super({ loading: false })
    this.initializeEffect(route.params.pipe(pluck('stat')))
  }

  readonly chart$ = this.select((s) => s.chart)
  readonly error$ = this.select((s) => s.error)
  readonly loading$ = this.select((s) => s.loading)
  readonly options$ = this.select((s) => s.options)
  readonly stat$ = this.select((s) => s.stat)
  readonly vm$ = this.select(
    this.chart$,
    this.error$,
    this.loading$,
    this.options$,
    this.stat$,
    (chart, error, loading, options, stat) => ({
      chart,
      error,
      loading,
      options,
      stat,
    }),
  )

  readonly initializeEffect = this.effect<KreStatType>((stat$) =>
    stat$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((stat) =>
        this.data.kreChart({ stat: { type: stat } }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                loading: false,
                stat: res.data?.stat,
                chart: res.data?.chart,
                options: res.data?.stat?.title ? getOptions((res as any)!.data.stat.title!) : {},
              }),
            (error) => this.patchState({ loading: false, error }),
          ),
        ),
      ),
    ),
  )
}
