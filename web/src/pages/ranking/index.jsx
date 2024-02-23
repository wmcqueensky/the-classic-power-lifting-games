import {Stack, Text, Table, Thead, Tbody, Tr, Th, Td, Button} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'

const RankingPage = () => {
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [scores, setScores] = useState([])
  const [lifters, setLifters] = useState({})
  const location = useLocation()
  const competitionId = new URLSearchParams(location.search).get('competitionId')

  useEffect(() => {
    const fetchCompetitionInfo = async () => {
      try {
        const {data: competitionData, error} = await supabase
          .from('competitions')
          .select('name, date, place')
          .eq('competition_id', competitionId)
          .single()

        if (error) {
          throw error
        }

        setCompetitionInfo(competitionData)
      } catch (error) {
        console.error('Error fetching competition info:', error.message)
      }
    }

    const fetchScoresForCompetition = async () => {
      try {
        const {data: scoresData, error} = await supabase
          .from('scores')
          .select('*')
          .eq('competition_id', competitionId)
          .order('score_id')

        if (error) {
          throw error
        }

        setScores(scoresData)

        // Extract lifter IDs
        const lifterIds = scoresData.map((score) => score.lifter_id)

        // Fetch lifter data using IDs
        const {data: lifterData, error: lifterError} = await supabase
          .from('lifters')
          .select('*')
          .in('lifter_id', lifterIds)

        if (lifterError) {
          throw lifterError
        }

        // Convert lifter data to an object for easier access
        const lifterObject = {}
        lifterData.forEach((lifter) => {
          lifterObject[lifter.lifter_id] = lifter
        })
        setLifters(lifterObject)
      } catch (error) {
        console.error('Error fetching scores for competition:', error.message)
      }
    }

    if (competitionId) {
      fetchCompetitionInfo()
      fetchScoresForCompetition()
    }
  }, [competitionId])

  return (
    <Stack h="100%">
      <Text fontSize="4xl" fontWeight="bold" mb="4">
        {competitionInfo.name}
      </Text>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        {competitionInfo.date}, {competitionInfo.place}
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
          </Tr>
        </Thead>
        <Tbody>
          {scores.map((score, index) => (
            <Tr key={index}>
              <Td>
                <Button
                  as="button"
                  height="24px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  border="1px"
                  px="12px"
                  py="8px"
                  borderRadius="6px"
                  fontSize="14px"
                  fontWeight="semibold"
                  bg="red"
                  borderColor="red"
                  color="white"
                  boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)"
                  _hover={{bg: '#ff1a1a'}}
                  _active={{
                    bg: '#cc0000',
                    transform: 'scale(0.98)',
                    borderColor: '#cc0000',
                  }}
                >
                  {lifters[score.lifter_id]?.first_name} {lifters[score.lifter_id]?.last_name}
                </Button>
              </Td>
              <Td>{score.weight}</Td>
              <Td>{score.makswl}</Td>
              <Td>{score.wilkswl}</Td>
              <Td>{score.maksmc}</Td>
              <Td>{score.wilksmc}</Td>
              <Td>{score.makswl + score.maksmc}</Td>
              <Td>{score.wilkswl + score.wilksmc}</Td>
              <Td>{score.club}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
}

export default RankingPage
