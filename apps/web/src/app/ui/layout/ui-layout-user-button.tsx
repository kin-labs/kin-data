import { Avatar, Group, Text, UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { forwardRef, ReactNode } from 'react'

interface UserButtonProps extends UnstyledButtonProps {
  avatarUrl: string
  name: string
  email: string
  icon?: ReactNode
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ avatarUrl, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group>
        <Avatar src={avatarUrl} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  ),
)
