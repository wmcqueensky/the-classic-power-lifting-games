import {Box, Heading, VStack, HStack} from '@chakra-ui/react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  CATEGORIES_PATH,
  CATEGORY_COMPETITION_CUSTOM_PATH,
  GENDERS_PATH,
  CATEGORIES_GENDER_CUSTOM_PATH,
  CATEGORY_DISCIPLINE_CUSTOM_PATH,
  DISCIPLINES_PATH,
} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'
import fetchDisciplines from '../../common/hooks/disciplines/use-disciplines.jsx'

const DisciplinePage = () => {
  const [disciplines, setDisciplines] = useState([])
  const {zawody: competitionId, gender} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDisciplines()
        setDisciplines(data)
      } catch (error) {
        console.error('Error fetching disciplines:', error.message)
      }
    }

    fetchData()
  }, [competitionId])

  const fetchCategoriesForAllDisciplines = () => {
    if (competitionId && gender) {
      navigate(`${CATEGORY_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}`)
    }

    if (!competitionId && gender) {
      navigate(`${CATEGORIES_GENDER_CUSTOM_PATH}${gender}`)
    }

    if (competitionId && !gender) {
      navigate(`${CATEGORY_COMPETITION_CUSTOM_PATH}${competitionId}`)
    }

    if (!competitionId && !gender) {
      navigate(CATEGORIES_PATH)
    }
  }

  const fetchCategoriesForDiscipline = (disciplineId) => {
    if (competitionId && gender) {
      navigate(
        `${CATEGORY_COMPETITION_CUSTOM_PATH}${competitionId}${GENDERS_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}`
      )
    }

    if (!competitionId && gender) {
      navigate(`${CATEGORIES_GENDER_CUSTOM_PATH}${gender}${DISCIPLINES_PATH}${disciplineId}`)
    }

    if (competitionId && !gender) {
      navigate(`${CATEGORY_COMPETITION_CUSTOM_PATH}${competitionId}${DISCIPLINES_PATH}${disciplineId}`)
    }

    if (!competitionId && !gender) {
      navigate(`${CATEGORY_DISCIPLINE_CUSTOM_PATH}${disciplineId}`)
    }
  }

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
        <HStack h="20%">
          <Box borderBottom="10px solid" borderColor="red" w="50px" mx={2} />
          <Box borderBottom="10px solid" borderColor="red" w="50px" mx={2} />
          <Box borderBottom="10px solid" borderColor="red" w="50px" mx={2} />
          <Box borderBottom="10px solid" borderColor="white" w="50px" mx={2} />
        </HStack>

        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Wybierz konkurencję:
        </Heading>

        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton onClick={fetchCategoriesForAllDisciplines}>Wszystkie</ChoiceButton>

          {disciplines.map((discipline) => (
            <ChoiceButton
              onClick={() => fetchCategoriesForDiscipline(discipline.discipline_id)}
              key={discipline.discipline_id}
            >
              {discipline.name}
            </ChoiceButton>
          ))}
        </VStack>
      </Box>
    </motion.div>
  )
}

export default DisciplinePage
