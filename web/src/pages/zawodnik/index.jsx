import {Stack, Text, Table, Thead, Tbody, Tr, Th, Td, Button} from '@chakra-ui/react'
import supabase from '../../config/supabaseClient.js'

const LifterPage = () => {
  console.log(supabase)

  const championshipsData = [
    {
      zawodnik: 'Rusek Damian',
      Waga: '80,89',
      'Maks WL': 120,
      'Wilks WL': 81.3595,
      'Maks MC': 260,
      'Wilks MC': 176.2788,
      Total: 380,
      Wilks: 257.6383,
      Klub: 'Farma Lifterów Wojny',
      Miejsce: 1,
    },
    {
      zawodnik: 'Ciachera Wiktor',
      Waga: '81,27',
      'Maks WL': 125,
      'Wilks WL': 84.5048,
      'Maks MC': 230,
      'Wilks MC': 155.4889,
      Total: 355,
      Wilks: 239.9937,
      Klub: 'AWL',
      Miejsce: 2,
    },
    {
      zawodnik: 'Wiśniewski Damian',
      Waga: '80,47',
      'Maks WL': 130,
      'Wilks WL': 88.4252,
      'Maks MC': 212.5,
      'Wilks MC': 144.5412,
      Total: 342.5,
      Wilks: 232.9664,
      Klub: null,
      Miejsce: 3,
    },
    {
      zawodnik: 'Stafa Jakub',
      Waga: '79,21',
      'Maks WL': 117.5,
      'Wilks WL': 80.7247,
      'Maks MC': 220,
      'Wilks MC': 151.144,
      Total: 337.5,
      Wilks: 231.8687,
      Klub: null,
      Miejsce: 4,
    },
    {
      zawodnik: 'Bednarczyk Rafał',
      Waga: '80,81',
      'Maks WL': 135,
      'Wilks WL': 91.5855,
      'Maks MC': 200,
      'Wilks MC': 135.6823,
      Total: 335,
      Wilks: 227.2678,
      Klub: 'AZS UMED ŁÓDŹ',
      Miejsce: 5,
    },
    {
      zawodnik: 'Studziński Witold',
      Waga: '82,61',
      'Maks WL': 120,
      'Wilks WL': 80.3247,
      'Maks MC': 187.5,
      'Wilks MC': 125.5074,
      Total: 307.5,
      Wilks: 205.8321,
      Klub: 'Turbo Dzik Team',
      Miejsce: 6,
    },
    {
      zawodnik: 'Droń Jan',
      Waga: '81,07',
      'Maks WL': 125,
      'Wilks WL': 84.6331,
      'Maks MC': 180,
      'Wilks MC': 121.8717,
      Total: 305,
      Wilks: 206.5048,
      Klub: 'PROTIP TEAM',
      Miejsce: 7,
    },
    {
      zawodnik: 'Bejgrowicz Józef',
      Waga: '82,66',
      'Maks WL': 75,
      'Wilks WL': 50.1848,
      'Maks MC': 220,
      'Wilks MC': 147.2088,
      Total: 295,
      Wilks: 197.3936,
      Klub: 'KS Team Wrocław',
      Miejsce: 8,
    },
    {
      zawodnik: 'Winiarczyk Arkadiusz',
      Waga: '79,15',
      'Maks WL': 112.5,
      'Wilks WL': 77.3271,
      'Maks MC': 145,
      'Wilks MC': 99.6661,
      Total: 257.5,
      Wilks: 176.9932,
      Klub: null,
      Miejsce: 9,
    },
  ]

  return (
    <Stack h="100%">
      <Text fontSize="4xl" fontWeight="bold" mb="4">
        Ranking
      </Text>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        12.12.2012, Łódź
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Zawodnik</Th>
            <Th>Waga</Th>
            <Th>Maks WL</Th>
            <Th>Wilks WL</Th>
            <Th>Maks MC</Th>
            <Th>Wilks MC</Th>
            <Th>Total</Th>
            <Th>Wilks</Th>
            <Th>Klub</Th>
            <Th>Miejsce</Th>
          </Tr>
        </Thead>
        <Tbody>
          {championshipsData.map((data, index) => (
            <Tr key={index}>
              <Td>
                <Button
                  as="button"
                  height="24px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  border="1px"
                  px="12px" // Increased padding
                  py="8px" // Added vertical padding
                  borderRadius="6px" // Rounded corners
                  fontSize="14px"
                  fontWeight="semibold"
                  bg="red" // Set background color to red
                  borderColor="red" // Set border color to red
                  color="white" // Set text color to white
                  boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)" // Added box-shadow
                  _hover={{bg: '#ff1a1a'}} // Hover background color
                  _active={{
                    bg: '#cc0000', // Active background color
                    transform: 'scale(0.98)',
                    borderColor: '#cc0000', // Active border color
                  }}
                >
                  {data.zawodnik}
                </Button>
              </Td>
              <Td>{data.Waga}</Td>
              <Td>{data['Maks WL']}</Td>
              <Td>{data['Wilks WL']}</Td>
              <Td>{data['Maks MC']}</Td>
              <Td>{data['Wilks MC']}</Td>
              <Td>{data.Total}</Td>
              <Td>{data.Wilks}</Td>
              <Td>{data.Klub}</Td>
              <Td>{data.Miejsce}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default LifterPage
