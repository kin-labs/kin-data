import { ChartBarIcon, DownloadIcon, DatabaseIcon } from '@heroicons/react/outline'
import { useKreStatListQuery } from '@kin-data/shared/util/sdk'
import Link from 'next/link'

const features = [
  { name: 'Explore Data', icon: DatabaseIcon, href: '/explore' },
  { name: 'Kin SDKs', icon: DownloadIcon, href: '/kin-sdks' },
  { name: 'Kin Rewards Engine', icon: ChartBarIcon, href: '/kre' },
]

export function KreIndex() {
  const { data, loading, error } = useKreStatListQuery()

  if (loading) {
    return (
      <div className="relative py-16 sm:py-24 lg:py-32">
        <h2>LOADING...</h2>
      </div>
    )
  }
  return (
    <div className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-brand-600 dark:text-brand-400 uppercase">
          Kin Rewards Engine
        </h2>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data?.stats?.map((stat) => (
              <Link key={stat.name} href={'/kre/' + stat.name}>
                <a key={stat.name} className="">
                  <div className="flow-root bg-gray-50 dark:bg-gray-800 shadow rounded-lg px-6 py-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 tracking-tight">
                      {stat.title}
                    </h3>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default KreIndex
