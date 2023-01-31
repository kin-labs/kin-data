import { ActionIcon, Group, Tooltip, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import React from 'react'

export function UiThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Tooltip label="You can also use ctrl + J / ⌘ + J to toggle color scheme">
      <Group position="center" my="xl">
        <ActionIcon
          onClick={() => toggleColorScheme()}
          size="lg"
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.colors.brand[3] : theme.colors.brand[6],
          })}
        >
          {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </Group>
    </Tooltip>
  )
}