import { Button, Group, Stack, Text } from '@mantine/core'
import { ChartData } from 'chart.js'
import React, { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { StatRange } from '../../../sdk'
import { ChartLinePage } from '../../ui/chart/chart-line-page'

export function DevIndex() {
  const pages = [
    { label: 'Dev 1', path: 'dev1' },
    { label: 'Dev 2', path: 'dev2' },
  ]
  return (
    <Stack spacing={16}>
      <Group spacing={2}>
        {pages?.map(({ label, path }) => (
          <Link key={path} className="btn btn-primary" to={path}>
            <Button>{label}</Button>
          </Link>
        ))}
      </Group>
      <Routes>
        <Route index element={<Navigate to="dev1" replace />} />
        <Route path="dev1" element={<Dev1 />} />
        <Route path="dev2" element={<Dev2 />} />
      </Routes>
    </Stack>
  )
}

function Dev1() {
  const description = `All transactions for Kin on the blockchain. (Account creations, earns, spends, etc)`
  const title = `Total Daily Transactions`
  const [selectedRange, setSelectedRange] = useState<StatRange>(StatRange['30days'])
  const data: ChartData<'line'> = {
    labels: [
      '2022-11-10',
      '2022-11-11',
      '2022-11-12',
      '2022-11-13',
      '2022-11-14',
      '2022-11-15',
      '2022-11-16',
      '2022-11-17',
      '2022-11-18',
      '2022-11-19',
      '2022-11-20',
      '2022-11-21',
      '2022-11-22',
      '2022-11-23',
      '2022-11-24',
      '2022-11-25',
      '2022-11-26',
      '2022-11-27',
      '2022-11-28',
      '2022-11-29',
      '2022-11-30',
      '2022-12-01',
      '2022-12-02',
      '2022-12-03',
      '2022-12-04',
      '2022-12-05',
      '2022-12-06',
      '2022-12-07',
      '2022-12-08',
      '2022-12-09',
    ],
    datasets: [
      {
        data: [
          242931, 248285, 292110, 334826, 249507, 265527, 246544, 244252, 254488, 293143, 328434, 267896, 241111,
          239518, 278292, 270461, 280648, 268695, 252029, 264517, 272241, 255757, 265400, 303321, 156129, 127, 69959,
          269933, 280376, 209586,
        ],
        label: 'Perfect365',
      },
      {
        data: [
          105097, 106258, 99305, 125790, 152152, 147714, 229877, 208011, 123047, 41459, 177270, 123454, 108793, 140108,
          130165, 117073, 121027, 126849, 162569, 152452, 189605, 142066, 178339, 194873, 89086, 58, 1430, 147390,
          161216, 107610,
        ],
        label: 'PeerBet',
      },
      {
        data: [
          19290, 33491, 28958, 18217, 35050, 52227, 58203, 55544, 63399, 41862, 46239, 53865, 32553, 65031, 64247,
          67339, 70469, 36811, 50743, 52223, 62519, 76030, 73841, 68822, 31161, 0, 1851, 70715, 59465, 53441,
        ],
        label: 'AstroBot',
      },
      {
        data: [
          51059, 52740, 57487, 55167, 54912, 59702, 55025, 51981, 53699, 49748, 45852, 44702, 48019, 51417, 50662,
          50475, 52265, 56298, 53565, 52545, 61589, 60306, 56235, 45611, 15725, 28, 15284, 61170, 48222, 20014,
        ],
        label: 'MadLipz',
      },
      {
        data: [
          37657, 37148, 37407, 36459, 37293, 38943, 37145, 37219, 38989, 37440, 37370, 37288, 41270, 37655, 37436,
          38806, 37316, 38216, 37379, 33762, 37174, 37616, 37520, 37414, 18613, 0, 8059, 37145, 36358, 27194,
        ],
        label: 'Just Joking',
      },
      {
        data: [
          13811, 18563, 19511, 18717, 9642, 13453, 23646, 19960, 8141, 11768, 7280, 9737, 8429, 8072, 9207, 7721, 8102,
          7963, 15256, 15555, 20784, 25811, 84982, 125673, 76436, 205, 0, 6, 173009, 100544,
        ],
        label: 'Kin4U',
      },
      {
        data: [
          43734, 42036, 39606, 26644, 22314, 35692, 24307, 24600, 27077, 24836, 25066, 27135, 26353, 26762, 25770,
          25344, 27038, 27169, 24830, 34418, 50374, 54330, 24668, 23316, 11206, 6, 148, 15894, 28074, 20751,
        ],
        label: 'App 181',
      },
      {
        data: [
          14598, 12973, 16462, 19893, 12582, 12833, 13751, 15236, 15807, 14614, 17224, 14349, 13883, 11182, 10671,
          13658, 19996, 25356, 19302, 31123, 29073, 21190, 13008, 14871, 13843, 6, 2266, 15461, 15366, 10365,
        ],
        label: 'kinbæt',
      },
      {
        data: [
          3805, 3521, 3808, 3286, 3999, 3309, 3334, 3426, 2691, 3523, 3489, 3189, 2555, 2820, 2794, 2581, 2589, 3121,
          2727, 2818, 5938, 7263, 3400, 3862, 1711, 0, 1115, 3389, 3510, 2805,
        ],
        label: 'Perfect365 Video',
      },
      {
        data: [
          1507, 1698, 1604, 1931, 2027, 2346, 1847, 1870, 1975, 2109, 2435, 2022, 2105, 2174, 2212, 2011, 1768, 2070,
          2231, 1829, 1875, 1899, 980, 654, 329, 0, 315, 551, 1821, 1299,
        ],
        label: 'Pause For',
      },
      {
        data: [
          1124, 1197, 1468, 1341, 1349, 1333, 1306, 1278, 1288, 1313, 1393, 1374, 1265, 1227, 1238, 1297, 1433, 1470,
          1353, 1219, 1254, 1228, 1256, 1389, 703, 0, 213, 1177, 1263, 955,
        ],
        label: 'App 125',
      },
      {
        data: [
          695, 580, 590, 579, 806, 645, 670, 916, 674, 539, 625, 399, 730, 839, 1101, 856, 628, 717, 770, 717, 3726,
          4702, 824, 792, 300, 0, 155, 840, 860, 333,
        ],
        label: 'Perk.Exchange',
      },
      {
        data: [
          18, 36, 21, 21, 26, 31, 26, 16, 6, 12, 42, 13, 21, 26, 15, 25, 18, 30, 211, 285, 3589, 4202, 322, 336, 23, 28,
          13, 418, 660, 298,
        ],
        label: 'Swelly',
      },
      {
        data: [1, 0, 0, 0, 0, 1, 0, 0, 30, 31, 25, 7, 15, 15, 13, 5, 12, 18, 0, 10, 2938, 3738, 0, 0, 1, 0, 0, 0, 0, 0],
        label: 'CoinKit',
      },
      {
        data: [2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2601, 4065, 0, 0, 1, 0, 0, 0, 0, 0],
        label: 'Uproll',
      },
      {
        data: [2, 2, 1, 2, 7, 0, 0, 2, 4, 2, 2, 4, 1, 2, 0, 1, 1, 1, 1, 2, 2592, 3845, 0, 0, 0, 0, 0, 0, 10, 13],
        label: 'KINTO',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2592, 3888, 0, 0, 0, 0, 0, 0, 0, 0],
        label: '4kin',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2800, 3679, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Kreechures',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2397, 4007, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Kindling',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2803, 3319, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Eviota',
      },
      {
        data: [
          54, 55, 59, 49, 50, 56, 39, 57, 60, 53, 33, 31, 51, 53, 58, 35, 54, 49, 49, 61, 58, 58, 56, 30, 22, 0, 0, 63,
          43, 99,
        ],
        label: 'pop.in',
      },
      {
        data: [8, 7, 3, 14, 10, 8, 1, 6, 15, 27, 5, 21, 19, 5, 8, 2, 0, 2, 1, 9, 4, 3, 3, 1, 0, 5, 0, 3, 5, 13],
        label: 'Cafeteria.gg',
      },
      {
        data: [23, 0, 0, 0, 0, 0, 21, 2, 6, 0, 0, 0, 0, 0, 6, 14, 0, 0, 2, 2, 23, 5, 3, 3, 4, 0, 1, 1, 4, 3],
        label: 'MeerKins',
      },
      {
        data: [0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Kinny List',
      },
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'App 56',
      },
    ],
  }

  return (
    <ChartLinePage
      data={data}
      description={description}
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      title={title}
    />
  )
}

function Dev2() {
  return <Text>Dev2</Text>
}
