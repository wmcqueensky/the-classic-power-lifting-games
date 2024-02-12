import {Stack, Text, Table, Thead, Tbody, Tr, Th, Td} from '@chakra-ui/react'

const StatisticsPage = () => {
  const championshipsData = [
    {rank: 1, athlete: 'John Doe', total: 800, squat: 300, bench: 200, deadlift: 300},
    {rank: 2, athlete: 'Jane Smith', total: 750, squat: 250, bench: 200, deadlift: 300},
    {rank: 3, athlete: 'Bob Johnson', total: 700, squat: 275, bench: 175, deadlift: 250},
    {rank: 4, athlete: 'Alice Brown', total: 680, squat: 240, bench: 180, deadlift: 260},
    {rank: 5, athlete: 'Charlie White', total: 670, squat: 230, bench: 185, deadlift: 255},
    {rank: 6, athlete: 'Emma Davis', total: 660, squat: 220, bench: 190, deadlift: 250},
    {rank: 7, athlete: 'Frank Green', total: 650, squat: 210, bench: 195, deadlift: 245},
    {rank: 8, athlete: 'Grace Taylor', total: 640, squat: 200, bench: 200, deadlift: 240},
    {rank: 9, athlete: 'Henry Harris', total: 630, squat: 190, bench: 205, deadlift: 235},
    {rank: 10, athlete: 'Ivy Miller', total: 620, squat: 180, bench: 210, deadlift: 230},
    // Add more users as needed
  ]

  return (
    <Stack h="100%">
      <Text fontSize="xl" fontWeight="bold" mb="4">
        Ranking
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Athlete</Th>
            <Th>Total</Th>
            <Th>Squat</Th>
            <Th>Bench</Th>
            <Th>Deadlift</Th>
          </Tr>
        </Thead>
        <Tbody>
          {championshipsData.map((data) => (
            <Tr key={data.rank}>
              <Td>{data.rank}</Td>
              <Td>{data.athlete}</Td>
              <Td>{data.total}</Td>
              <Td>{data.squat}</Td>
              <Td>{data.bench}</Td>
              <Td>{data.deadlift}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default StatisticsPage
