import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

export interface ThemeToggleProps {
  toggleTheme: () => void
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
    >
      <span className="sr-only">View notifications</span>
      {theme === 'dark' ? (
        <SunIcon className="h-6 w-6" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  )
}
