import {Text, Table, Thead, Tbody, Tr, Th, Td, Box} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'

import TableButton from '../../common/components/table-button.jsx'
import backgroundImage from '../../common/assets/statistics-background.png'

import fetchCategoryInfo from '../../common/hooks/categories/use-category-for-ranking-info.jsx'
import fetchCompetitionInfo from '../../common/hooks/competitions/use-competition-for-ranking-info.jsx'

import fetchScoresForRanking from '../../common/hooks/scores/use-scores-for-ranking.jsx'
import fetchLiftersData from '../../common/hooks/lifters/use-lifters-for-ranking.jsx'
import fetchCompetitionsData from '../../common/hooks/competitions/use-competitions-for-ranking.jsx'
import fetchCategoriesData from '../../common/hooks/categories/use-categories-for-ranking.jsx'

const RankingPage = () => {
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [categoryInfo, setCategoryInfo] = useState({})
  const [scores, setScores] = useState([])
  const [lifters, setLifters] = useState({})
  const [competitions, setCompetitions] = useState({})
  const [categories, setCategories] = useState({})
  const {zawody: competitionId, kategoria: categoryId} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoresData = await fetchScoresForRanking(competitionId, categoryId)
        setScores(scoresData)

        const lifterIds = scoresData.map((score) => score.lifter_id)
        const lifterData = await fetchLiftersData(lifterIds)
        setLifters(lifterData)

        if (!competitionId) {
          const competitionIds = scoresData.map((score) => score.competition_id)
          const competitionData = await fetchCompetitionsData(competitionIds)
          setCompetitions(competitionData)
        }

        if (!categoryId) {
          const categoryIds = scoresData.map((score) => score.category_id)
          const categoryData = await fetchCategoriesData(categoryIds)
          setCategories(categoryData)
        }

        if (competitionId) {
          const competitionData = await fetchCompetitionInfo(competitionId)
          setCompetitionInfo(competitionData)
        }

        if (categoryId) {
          const categoryData = await fetchCategoryInfo(categoryId)
          setCategoryInfo(categoryData)
        }
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [competitionId, categoryId])

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
      <Box bgImage={`url(${backgroundImage})`} backgroundSize="cover" backgroundPosition="center" h="100%">
        {competitionId && categoryId && (
          <Text fontSize="4xl" fontWeight="bold" mb="4">
            {competitionInfo.name} | {categoryInfo.name}
          </Text>
        )}

        {competitionId && !categoryId && (
          <Text fontSize="4xl" fontWeight="bold" mb="4">
            {competitionInfo.name} |
          </Text>
        )}

        {categoryId && !competitionId && (
          <Text fontSize="4xl" fontWeight="bold" mb="4">
            | {categoryInfo.name}
          </Text>
        )}

        {competitionId && (
          <Text fontSize="xl" fontWeight="bold" mb="4">
            {competitionInfo.date}, {competitionInfo.place}
          </Text>
        )}
        <Box overflowX="auto">
          <Table variant="striped" colorScheme="blackAlpha" minWidth="100%">
            <Thead>
              <Tr>
                <Th>Miejsce</Th>
                <Th>Zawodnik</Th>
                <Th>Płeć</Th>
                <Th>Waga [Kg]</Th>
                <Th>Klub</Th>
                {!competitionId && <Th>Zawody</Th>}
                {!categoryId && <Th>Kategoria</Th>}
                <Th>Maks WL [Kg]</Th>
                <Th>Wilks WL</Th>
                <Th>Maks MC [Kg]</Th>
                <Th>Wilks MC</Th>
                <Th>Total [Kg]</Th>
                <Th>Wilks</Th>
              </Tr>
            </Thead>
            <Tbody>
              {scores.map((score, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>
                    <TableButton
                      key={score.lifter_id}
                      onClick={() => navigate(`/zawodnik/${score.lifter_id}`)}
                    >
                      {lifters[score.lifter_id]?.first_name} {lifters[score.lifter_id]?.last_name}
                    </TableButton>
                  </Td>
                  <Td>{lifters[score.lifter_id]?.gender}</Td>
                  <Td>{score.weight.toFixed(2)}</Td>
                  <Td>{score.club}</Td>
                  {!competitionId && (
                    <Td>
                      <TableButton onClick={() => navigate(`/ranking/zawody/${score.competition_id}`)}>
                        {competitions[score.competition_id]?.name}
                      </TableButton>
                    </Td>
                  )}
                  {!categoryId && (
                    <Td>
                      <TableButton onClick={() => navigate(`/ranking/kategoria/${score.category_id}`)}>
                        {categories[score.category_id]?.name}
                      </TableButton>
                    </Td>
                  )}
                  <Td>{score.makswl.toFixed(2)}</Td>
                  <Td>{score.wilkswl.toFixed(4)}</Td>
                  <Td>{score.maksmc.toFixed(2)}</Td>
                  <Td>{score.wilksmc.toFixed(4)}</Td>
                  <Td>{(score.makswl + score.maksmc).toFixed(2)}</Td>
                  <Td>{(score.wilkswl + score.wilksmc).toFixed(4)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </motion.div>
  )
}

export default RankingPage
