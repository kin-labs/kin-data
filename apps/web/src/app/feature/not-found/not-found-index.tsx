import { Container, createStyles, Title } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },
}))

export function NotFoundIndex() {
  const { classes } = useStyles()

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title} variant="gradient" gradient={{ from: '#7546f6', to: '#c8aff8' }}>
        Page not Found.
      </Title>
    </Container>
  )
}
