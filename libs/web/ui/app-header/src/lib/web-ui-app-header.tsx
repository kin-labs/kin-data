import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { ThemeToggle } from '@kin-data/web/ui/theme-toggle'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export interface AppHeaderLink {
  href: string
  label: string
}

export interface AppHeaderProps {
  links: AppHeaderLink[]
  toggleTheme: () => void
}

export const AppHeader: React.FC<AppHeaderProps> = ({ links, toggleTheme }) => {
  const { asPath } = useRouter()
  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-800 shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img className="block lg:hidden h-8 w-auto" src="/kin-logo-small.svg" alt="Workflow" />
                  <img className="hidden lg:block h-8 w-auto" src="/kin-logo-small.svg" alt="Workflow" />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <a
                        className={classNames(
                          asPath === link.href
                            ? 'border-brand-500 text-gray-900 dark:text-gray-100'
                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                        )}
                      >
                        {link.label}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <ThemeToggle toggleTheme={toggleTheme} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      asPath === link.href
                        ? 'bg-brand-50 border-brand-500 text-brand-700'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                      'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                    )}
                  >
                    {link.label}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
