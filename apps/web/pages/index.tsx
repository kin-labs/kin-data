import { ChartBarIcon, DownloadIcon, DatabaseIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const features = [
  { name: 'Explore Data', icon: DatabaseIcon, href: '/explore' },
  { name: 'Kin SDKs', icon: DownloadIcon, href: '/kin-sdks' },
  { name: 'Kin Rewards Engine', icon: ChartBarIcon, href: '/kre' },
]

export function Index() {
  return (
    <div className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
          Kin Data
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl">
          Get the insights.
        </p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
          Phasellus lorem quam molestie id quisque diam aenean nulla in. Accumsan in quis quis nunc, ullamcorper
          malesuada. Eleifend condimentum id viverra nulla.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <a key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-brand-500 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-gray-200 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.
                      </p>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <section className="py-6 dark:bg-gray-800 dark:text-gray-50 mt-24">
        <div className="relative py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
              Blockchain Explorer
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-gray-200 tracking-tight sm:text-4xl">
              See KIN on solana.
            </p>
            <div className="flex space-x-8 justify-center mt-8">
              <a
                target={'_blank'}
                rel="noreferrer"
                href="https://explorer.solana.com/address/kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6"
                className="btn btn-primary btn-xl "
              >
                Mainnet
              </a>

              <a
                target={'_blank'}
                rel="noreferrer"
                href="https://explorer.solana.com/address/kinTese33ph6r6txhC5RbftBGzmi68MPaT9ByhXqPbo?cluster=custom&customUrl=https%3A%2F%2Flocal.validator.agorainfra.dev"
                className="btn btn-primary btn-xl "
              >
                Testnet
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default Index
