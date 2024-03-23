import {Box, Heading, VStack} from '@chakra-ui/react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  CATEGORIES_PATH,
  CATEGORY_COMPETITION_CUSTOM_PATH,
  RANKING_GENDER_CUSTOM_PATH,
  GENDERS_PATH,
} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

import fetchDisciplines from '../../common/hooks/categories/use-categories-for-discipline.jsx'

const DisciplinePage = () => {
  const [categories, setCategories] = useState([])
  const {zawody: competitionId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDisciplines()

      if (data) {
        setCategories(data)
      }
    }

    fetchData()
  })

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
        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Wybierz konkurencję:
        </Heading>

        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton
            onClick={() =>
              navigate(
                competitionId ? `${CATEGORY_COMPETITION_CUSTOM_PATH}${competitionId}` : CATEGORIES_PATH
              )
            }
          >
            Wszystkie
          </ChoiceButton>

          {categories.map((category) => (
            <ChoiceButton onClick={() => navigate(``)} key={category.discipline}>
              {category.discipline}
            </ChoiceButton>
          ))}
        </VStack>
      </Box>
    </motion.div>
  )
}

export default DisciplinePage
