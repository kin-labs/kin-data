import { Injectable } from '@angular/core'
import { LayoutFooterLink, LayoutHeaderLink } from '@kin-data/web/layout/ui'
import { ComponentStore } from '@ngrx/component-store'

interface WebLayoutFeatureState {
  logo: string
  footerLinks: LayoutFooterLink[]
  headerLinks: LayoutHeaderLink[]
}

@Injectable()
export class WebLayoutFeatureStore extends ComponentStore<WebLayoutFeatureState> {
  constructor() {
    super({
      logo: '/assets/kin-logo.svg',
      footerLinks: [],
      headerLinks: [
        { path: '/home', label: 'Home' },
        { path: '/kre', label: 'KRE' },
      ],
    })
  }

  readonly logo$ = this.select((s) => s.logo)
  readonly footerLinks$ = this.select((s) => s.footerLinks)
  readonly headerLinks$ = this.select((s) => s.headerLinks)
  readonly vm$ = this.select(this.footerLinks$, this.headerLinks$, this.logo$, (footerLinks, headerLinks, logo) => ({
    footerLinks,
    headerLinks,
    logo,
  }))
}
