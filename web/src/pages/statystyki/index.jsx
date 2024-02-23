import {Box, Button, Text, UnorderedList, ListItem} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'

const StatisticsPage = () => {
  const [competitions, setCompetitions] = useState([])
  const navigate = useNavigate()

  const fetchScoresForCompetition = async (competitionName) => {
    try {
      const {data: competitionData, error} = await supabase
        .from('competitions')
        .select('competition_id')
        .eq('name', competitionName)
        .single()

      if (error) {
        throw error
      }

      navigate(`/statystyki/ranking?competitionId=${competitionData.competition_id}`)
    } catch (error) {
      console.error('Error fetching scores for competition:', error.message)
    }
  }

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const {data, error} = await supabase.from('competitions').select('name')

        if (error) {
          throw error
        }

        setCompetitions(data)
      } catch (error) {
        console.error('Error fetching competitions:', error.message)
      }
    }

    fetchCompetitions()
  }, [])

  return (
    <Box h="100vh">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Select a Competition:
      </Text>
      <UnorderedList>
        {competitions.map((competition, index) => (
          <ListItem key={index}>
            <Button onClick={() => fetchScoresForCompetition(competition.name)}>{competition.name}</Button>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default StatisticsPage
