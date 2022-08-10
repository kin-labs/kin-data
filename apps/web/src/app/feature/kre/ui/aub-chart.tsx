import { Box, Center, Checkbox, CheckboxGroup, Text, Wrap } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
} from 'victory'
import { prepareData, prepareXTicks, prepareYTicks } from './chart-helpers'
import { KreDataSet } from './kre-graph'

export function AubChart({ data }: { data: KreDataSet }) {
  // Current implementation
  // Take data points per week and 4 weeks per app
  // Another implementation can be to changes x/y ticks with every app selection

  const [selection, setSelection] = useState<string[]>([
    '4kin',
    'KINTO',
    'Kin4U',
    'Pause For',
    'Perfect365 Video',
    'Perk.Exchange',
    'Swelly',
    'Uproll',
    'pop.in',
  ])

  // const { data: originalData } = chart
  const { dataSlice, apps } = useMemo(() => prepareData(data), [data])
  const xTickValues = useMemo(() => prepareXTicks(dataSlice), [dataSlice])
  const { min, max }: { min: number; max: number } = useMemo(
    () => prepareYTicks(dataSlice, selection),
    [dataSlice, selection],
  )

  const onSelectionChange = (selection: string[]) => {
    const newSelection = apps.filter(({ name }) => selection.includes(name)).map((app) => app.name)
    setSelection(newSelection)
  }

  return (
    <Box>
      <Box display="grid" placeItems="center" py={2} fontWeight="bold" fontSize="md">
        <CheckboxGroup colorScheme="green" value={selection} onChange={onSelectionChange}>
          <Wrap spacing="10px">
            {apps.map(({ name, color }) => (
              <Center key={name} w="180px" h="40px" bg={color}>
                <Checkbox value={name}>{name}</Checkbox>
              </Center>
            ))}
          </Wrap>
        </CheckboxGroup>
      </Box>
      <Box display="grid" placeItems="center" py={2} fontWeight="bold" fontSize="md">
        <Text>Showing Bi-Weekly Transactions for the Last 24 Weeks per App</Text>
      </Box>
      <VictoryChart
        width={1200}
        theme={VictoryTheme.material}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryAxis tickValues={xTickValues} tickLabelComponent={<VictoryLabel angle={315} />} />
        <VictoryAxis
          dependentAxis
          tickCount={10}
          domain={[min, max]}
          tickFormat={(t: any) => `${Math.round(t / 1000000000)}B`}
        />

        {selection?.map((app) => (
          <VictoryGroup key={app}>
            <VictoryLine
              label={app}
              data={dataSlice[app]}
              interpolation="natural"
              style={{
                labels: { fontSize: 10 },
                parent: { border: '1px solid #ccc' },
                data: {
                  stroke: `${apps.find((a) => a.name === app)?.color}`,
                },
              }}
            />
            <VictoryScatter
              style={{ data: { fill: `${apps.find((a) => a.name === app)?.color}` } }}
              size={5}
              data={dataSlice[app]}
            />
          </VictoryGroup>
        ))}
      </VictoryChart>
      <Box as="pre" p="6" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="xs">
        {JSON.stringify({ selection, xTickValues, min, max }, null, 2)}
      </Box>
    </Box>
  )
}
