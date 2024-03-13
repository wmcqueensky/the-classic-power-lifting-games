import {Box, Heading, VStack} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  RANKING_COMPETITION_CUSTOM_PATH,
  CATEGORIES_PATH,
  RANKING_CATEGORY_CUSTOM_PATH,
  RANKING_PATH,
} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

import fetchAllCategories from '../../common/hooks/categories/use-categories.jsx'
import fetchCategoriesForCompetition from '../../common/hooks/categories/use-category-for-competition.jsx'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const {zawody: competitionId} = useParams()
  const navigate = useNavigate()

  const fetchScoresForCompetitionCategory = async (categoryId) => {
    if (competitionId) {
      navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}${CATEGORIES_PATH}/${categoryId}`)
    }

    if (!competitionId) {
      navigate(`${RANKING_CATEGORY_CUSTOM_PATH}${categoryId}`)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let categoriesData = []

        if (competitionId) {
          categoriesData = await fetchCategoriesForCompetition(competitionId)
        }

        if (!competitionId) {
          categoriesData = await fetchAllCategories()
        }

        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error.message)
      }
    }

    fetchCategories()
  }, [competitionId])

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
          Wybierz kategorie:
        </Heading>{' '}
        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton
            onClick={() =>
              navigate(competitionId ? `${RANKING_COMPETITION_CUSTOM_PATH}${competitionId}` : RANKING_PATH)
            }
          >
            Wszystkie
          </ChoiceButton>
          {categories.map((category) => (
            <ChoiceButton
              key={category.name}
              onClick={() => fetchScoresForCompetitionCategory(category.category_id)}
            >
              {category.name}
            </ChoiceButton>
          ))}
        </VStack>
      </Box>
    </motion.div>
  )
}

export default CategoriesPage
