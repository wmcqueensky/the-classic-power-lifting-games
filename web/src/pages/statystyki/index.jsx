import {Box, Button, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statisticsBackground.png'
import ChoiceButton from '../../common/components/choiceButton.jsx'

const containerVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0, transition: {delay: 0.5, type: 'spring', stiffness: 40}},
}

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

      navigate(`/kategoria?zawody=${competitionData.competition_id}`)
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        bgImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading
          fa="h1"
          fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}}
          mb={4}
          textAlign="center"
        >
          Wybierz zawody:
        </Heading>
        <ChoiceButton onClick={() => navigate(`/kategoria`)}>Wszystkie</ChoiceButton>
        {competitions.map((competition) => (
          <ChoiceButton onClick={() => fetchScoresForCompetition(competition.name)} key={competition.name}>
            {competition.name}
          </ChoiceButton>
        ))}
      </Box>
    </motion.div>
  )
}

export default StatisticsPage
