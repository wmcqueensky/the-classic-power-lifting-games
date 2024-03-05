import {Box, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statisticsBackground.png'
import ChoiceButton from '../../common/components/choiceButton.jsx'
import {smoothVariant} from '../../common/animations/smoothSlideInAnimation.jsx'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const {zawody: competitionId} = useParams()
  const navigate = useNavigate()

  const fetchScoresForCompetitionCategory = async (categoryName) => {
    try {
      const {data, error} = await supabase
        .from('categories')
        .select('category_id')
        .eq('name', categoryName)
        .single()

      if (error) {
        throw error
      }
      if (competitionId) {
        navigate(`/ranking/zawody/${competitionId}/kategoria/${data.category_id}`)
      } else {
        navigate(`/ranking/kategoria/${data.category_id}`)
      }
    } catch (error) {
      console.error('Error fetching scores for competition category:', error.message)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (competitionId) {
          let categoriesData
          const {data: scoreData, error: scoresError} = await supabase
            .from('scores')
            .select('category_id')
            .eq('competition_id', competitionId)

          if (scoresError) {
            throw scoresError
          }

          const categoryIds = [...new Set(scoreData.map((score) => score.category_id))]
          const {data: fetchedCategoriesData, error: categoriesError} = await supabase
            .from('categories')
            .select('name')
            .in('category_id', categoryIds)
          if (categoriesError) {
            throw categoriesError
          }
          categoriesData = fetchedCategoriesData
          setCategories(categoriesData)
        } else {
          const {data: allCategoriesData, error: categoriesError} = await supabase
            .from('categories')
            .select('name')
          if (categoriesError) {
            throw categoriesError
          }
          setCategories(allCategoriesData)
        }
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
        <ChoiceButton
          onClick={() => navigate(competitionId ? `/ranking/zawody/${competitionId}` : `/ranking`)}
        >
          Wszystkie
        </ChoiceButton>
        {categories.map((category) => (
          <ChoiceButton key={category.name} onClick={() => fetchScoresForCompetitionCategory(category.name)}>
            {category.name}
          </ChoiceButton>
        ))}
      </Box>
    </motion.div>
  )
}

export default CategoriesPage
