import {Box, Button, Text, UnorderedList, ListItem, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statisticsBackground.png'

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
        {competitions.map((competition) => (
          <Button
            as="button"
            height={{base: '36px', md: '46px'}}
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            border="1px"
            p={{base: '30px', md: '50px'}}
            m="2"
            borderRadius="10px"
            fontSize={{base: '18px', md: '26px'}}
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
            key={competition.name}
            onClick={() => fetchScoresForCompetition(competition.name)}
          >
            {competition.name}
          </Button>
        ))}
      </Box>
    </motion.div>
  )
}

export default StatisticsPage
