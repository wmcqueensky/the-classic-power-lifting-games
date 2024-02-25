import {Stack, Text, Table, Thead, Tbody, Tr, Th, Td, Button} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'

const RankingPage = () => {
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [categoryInfo, setCategoryInfo] = useState({})
  const [scores, setScores] = useState([])
  const [lifters, setLifters] = useState({})
  const location = useLocation()

  const competitionIdParam = new URLSearchParams(location.search).get('zawody')
  const competitionId = competitionIdParam !== null ? competitionIdParam : 0
  const categoryIdParam = new URLSearchParams(location.search).get('kategoria')
  const categoryId = categoryIdParam !== null ? categoryIdParam : 0

  useEffect(() => {
    const fetchCompetitionInfo = async () => {
      try {
        const {data: data, error} = await supabase
          .from('competitions')
          .select('name, date, place')
          .eq('competition_id', competitionId)
          .single()

        if (error) {
          throw error
        }

        setCompetitionInfo(data)
      } catch (error) {
        console.error('Error fetching competition info:', error.message)
      }
    }

    const fetchCategoryInfo = async () => {
      try {
        const {data: data, error} = await supabase
          .from('categories')
          .select('name')
          .eq('category_id', categoryId)
          .single()

        if (error) {
          throw error
        }

        setCategoryInfo(data)
      } catch (error) {
        console.error('Error fetching category info:', error.message)
      }
    }

    const fetchScoresForCompetition = async () => {
      try {
        let query = supabase.from('scores').select('*')

        if (competitionId !== 0 && categoryId !== 0) {
          query = query.eq('competition_id', competitionId).eq('category_id', categoryId)
        } else if (competitionId !== 0 && categoryId === 0) {
          query = query.eq('competition_id', competitionId)
        } else if (categoryId !== 0 && competitionId === 0) {
          query = query.eq('category_id', categoryId)
        }

        const {data: scoresData, error} = await query

        if (error) {
          throw error
        }

        scoresData.sort((a, b) => b.wilkswl + b.wilksmc - (a.wilkswl + a.wilksmc))

        setScores(scoresData)

        const lifterIds = scoresData.map((score) => score.lifter_id)

        const {data: lifterData, error: lifterError} = await supabase
          .from('lifters')
          .select('*')
          .in('lifter_id', lifterIds)

        if (lifterError) {
          throw lifterError
        }

        const lifterObject = {}
        lifterData.forEach((lifter) => {
          lifterObject[lifter.lifter_id] = lifter
        })
        setLifters(lifterObject)
      } catch (error) {
        console.error('Error fetching scores for competition:', error.message)
      }
    }

    if (competitionId !== 0) {
      fetchCompetitionInfo()
    }

    if (categoryId !== 0) {
      fetchCategoryInfo()
    }

    fetchScoresForCompetition()
  }, [])

  return (
    <Stack h="100%">
      <Text fontSize="4xl" fontWeight="bold" mb="4">
        {competitionId === 0 ? 'ALL' : competitionInfo.name} | {categoryId === 0 ? 'ALL' : categoryInfo.name}
      </Text>
      <Text fontSize="xl" fontWeight="bold" mb="4">
        {competitionInfo.date}, {competitionInfo.place}
      </Text>
      //to musi znikać
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>Miejsce</Th>
            <Th>Zawodnik</Th>
            <Th>Waga [Kg]</Th>
            <Th>Maks WL [Kg]</Th>
            <Th>Wilks WL</Th>
            <Th>Maks MC [Kg]</Th>
            <Th>Wilks MC</Th>
            <Th>Total [Kg]</Th>
            <Th>Wilks</Th>
            <Th>Klub</Th>
          </Tr>
        </Thead>
        <Tbody>
          {scores.map((score, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
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
                  _hover={{bg: '#DF1818', borderColor: '#DF1818'}}
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
