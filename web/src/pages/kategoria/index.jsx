import {Box, Heading} from '@chakra-ui/react'
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

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const competitionIdParam = new URLSearchParams(location.search).get('zawody')
  const competitionId = competitionIdParam !== null ? competitionIdParam : 0

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

      if (competitionId != 0) {
        navigate(`/ranking?zawody=${competitionId}&&kategoria=${data.category_id}`)
      }

      if (competitionId === 0) {
        navigate(`/ranking?kategoria=${data.category_id}`)
      }
    } catch (error) {
      console.error('Error fetching scores for competition category:', error.message)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let categoriesData
        if (competitionId === 0) {
          const {data: allCategoriesData, error: categoriesError} = await supabase
            .from('categories')
            .select('name')
          if (categoriesError) {
            throw categoriesError
          }
          categoriesData = allCategoriesData
        }

        if (competitionId !== 0) {
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
        }
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching categories:', error.message)
      }
    }

    fetchCategories()
  }, [competitionId])

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
        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Wybierz kategorie:
        </Heading>{' '}
        <ChoiceButton
          onClick={() => navigate(competitionId === 0 ? `/ranking` : `/ranking?zawody=${competitionId}`)}
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
