import { CommonModule } from '@angular/common'
import { Component, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { UiPageComponentModule } from '@kin-data/web/ui/page'

@Component({
  template: `
    <ui-page>
      <div class="relative py-16 sm:py-24 lg:py-32">
        <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 class="text-base font-semibold tracking-wider text-primary-600 dark:text-primary-400 uppercase">
            Kin Data
          </h2>
          <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl">
            Get the insights.
          </p>
          <p class="mt-5 max-w-prose mx-auto text-xl text-gray-500">
            Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
            malesuada. Eleifend condimentum id viverra nulla.
          </p>
          <div class="mt-12">
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ng-container *ngFor="let feature of features">
                <a [routerLink]="feature.path" class="pt-6">
                  <div class="flow-root bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-6 pb-8">
                    <div class="-mt-6">
                      <div>
                        <span class="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                          <svg
                            *ngIf="feature.icon === 'database'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                            />
                          </svg>

                          <svg
                            *ngIf="feature.icon === 'download'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>

                          <svg
                            *ngIf="feature.icon === 'chart'"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                          </svg>
                        </span>
                      </div>
                      <h3 class="mt-8 text-lg font-medium text-gray-900 dark:text-gray-200 tracking-tight">
                        {{ feature.name }}
                      </h3>
                      <p class="mt-5 text-base text-gray-500">
                        {{ feature.description }}
                      </p>
                    </div>
                  </div>
                </a>
              </ng-container>
            </div>
          </div>
        </div>
        <section class="py-6 dark:bg-gray-800 dark:text-gray-50 mt-24">
          <div class="relative py-16 sm:py-24 lg:py-32">
            <div class="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <h2 class="text-base font-semibold tracking-wider text-primary-600 dark:text-primary-400 uppercase">
                Blockchain Explorer
              </h2>
              <p class="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl">
                See KIN on solana.
              </p>
              <div class="flex space-x-8 justify-center mt-8">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://explorer.solana.com/address/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6"
                  class="btn btn-primary btn-xl "
                >
                  Mainnet
                </a>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://explorer.solana.com/address/kinTese33ph6r6txhC5RbftBGzmi68MPaT9ByhXqPbo?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev"
                  class="btn btn-primary btn-xl "
                >
                  Testnet
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ui-page>
  `,
})
export class HomeFeatureComponent {
  features = [
    {
      name: 'Explore Data',
      icon: 'database',
      path: '/explore',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    },
    {
      name: 'Kin SDKs',
      icon: 'download',
      path: '/kin-sdks',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    },
    {
      name: 'Kin Rewards Engine',
      icon: 'chart',
      path: '/kre',
      description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    },
  ]
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: HomeFeatureComponent }]),
    UiPageComponentModule,
  ],
  declarations: [HomeFeatureComponent],
  exports: [HomeFeatureComponent],
})
export class HomeFeatureComponentModule {}
