/* eslint-disable-next-line */
import React from 'react'
import Link from 'next/link'

export interface AppFooterLink {
  label: string
  href: string
}
export interface AppFooterLinkGroup {
  title: string
  links: AppFooterLink[]
}

export interface AppFooterProps {
  groups: AppFooterLinkGroup[]
}

export function AppFooter(props: AppFooterProps) {
  return (
    <footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <a href="#" className="flex justify-center space-x-3 lg:justify-start">
            <div className="flex items-center justify-center w-12 h-12 rounded-full dark:bg-violet-400">
              <img className="h-8 w-auto" src="/kin-logo-small.svg" alt="Workflow" />
            </div>
          </a>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          {props.groups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="tracking-wide uppercase dark:text-gray-50">{group.title}</h3>
              <ul className="space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} passHref>
                      <a>{link.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-400">© 2021 Kin Foundation. All rights reserved.</div>
    </footer>
  )
}
