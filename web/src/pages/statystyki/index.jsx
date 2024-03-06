import {Box, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import fetchCompetitions from '../../common/hooks/competitions/use-competitions.jsx'

const StatisticsPage = () => {
  const [competitions, setCompetitions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCompetitionsData = async () => {
      const data = await fetchCompetitions()

      if (data) {
        setCompetitions(data)
      }
    }

    fetchCompetitionsData()
  }, [])

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
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
          <ChoiceButton
            onClick={() => navigate(`/kategoria/zawody/${competition.competition_id}`)}
            key={competition.name}
          >
            {competition.name}
          </ChoiceButton>
        ))}
      </Box>
    </motion.div>
  )
}

export default StatisticsPage
