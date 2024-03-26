import {Text, Table, Thead, Tbody, Tr, Th, Td, Box} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {
  LIFTER_CUSTOM_PATH,
  RANKING_COMPETITION_CUSTOM_PATH,
  RANKING_CATEGORY_CUSTOM_PATH,
} from '../../router/paths.js'

import TableButton from '../../common/components/table-button.jsx'
import backgroundImage from '../../common/assets/statistics-background.png'

import fetchCategoryInfo from '../../common/hooks/categories/use-category-for-ranking-info.jsx'
import fetchCompetitionInfo from '../../common/hooks/competitions/use-competition-for-ranking-info.jsx'
import fetchDisciplineInfo from '../../common/hooks/disciplines/use-discipline-for-ranking-info.jsx'

import fetchScoresForRanking from '../../common/hooks/scores/use-scores-for-ranking.jsx'
import fetchLiftersData from '../../common/hooks/lifters/use-lifters-for-ranking.jsx'
import fetchCompetitionsData from '../../common/hooks/competitions/use-competitions-for-ranking.jsx'
import fetchCategoriesData from '../../common/hooks/categories/use-categories-for-ranking.jsx'

const RankingPage = () => {
  const [loading, setLoading] = useState(true)
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [categoryInfo, setCategoryInfo] = useState({})
  const [disciplineInfo, setDisciplineInfo] = useState({})
  const [scores, setScores] = useState([])
  const [lifters, setLifters] = useState({})
  const [competitions, setCompetitions] = useState({})
  const [categories, setCategories] = useState({})
  const {
    zawody: competitionId,
    kategoria: categoryId,
    gender: gender,
    konkurencja: disciplineId,
  } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scoresData = await fetchScoresForRanking(competitionId, categoryId, gender, disciplineId)
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

          const disciplineData = await fetchDisciplineInfo(categoryData.discipline_id)
          setDisciplineInfo(disciplineData)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchData()
  }, [competitionId, categoryId])

  if (loading) {
    return <div>Loading...</div>
  }

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
            {competitionInfo.name} | Wszystkie Kategorie
          </Text>
        )}

        {categoryId && !competitionId && (
          <Text fontSize="4xl" fontWeight="bold" mb="4">
            Wszystkie Zawody | {categoryInfo.name}
          </Text>
        )}

        {competitionId && (
          <Text fontSize="xl" fontWeight="bold" mb="4">
            {competitionInfo.date}, {competitionInfo.place}
          </Text>
        )}

        <Table variant="striped" colorScheme="blackAlpha" minWidth="100%" size="sm" overflowX="scroll">
          <Thead bgColor="white" position="sticky" top="88" zIndex="sticky">
            <Tr>
              <Th>Miejsce</Th>
              <Th>Zawodnik</Th>
              <Th>Płeć</Th>
              <Th>Waga</Th>
              <Th>Klub</Th>
              {!competitionId && <Th>Zawody</Th>}
              {!categoryId && <Th>Kategoria</Th>}
              {/* {disciplineInfo.name === 'Steel Grip' && <Th>SteelGrip</Th>}
              {disciplineInfo.name === 'Steel Grip' && <Th>WilksSG</Th>} */}
              <Th>SteelGrip</Th>
              <Th>WilksSG</Th>
              <Th>Squat</Th>
              <Th>WilksSQT</Th>
              <Th>Bench</Th>
              <Th>WilksBP</Th>
              <Th>Deadlift</Th>
              <Th>WilksDL</Th>
              <Th>Total</Th>
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
                    onClick={() => navigate(`${LIFTER_CUSTOM_PATH}${score.lifter_id}`)}
                  >
                    {lifters[score.lifter_id]?.first_name} {lifters[score.lifter_id]?.last_name}
                  </TableButton>
                </Td>

                <Td>{lifters[score.lifter_id]?.gender}</Td>
                <Td>{score.weight.toFixed(2)}</Td>
                <Td>{score.club}</Td>

                {!competitionId && (
                  <Td>
                    <TableButton
                      onClick={() => navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${score.competition_id}`)}
                    >
                      {competitions[score.competition_id]?.name}
                    </TableButton>
                  </Td>
                )}

                {!categoryId && (
                  <Td>
                    <TableButton
                      onClick={() => navigate(`${RANKING_CATEGORY_CUSTOM_PATH}${score.category_id}`)}
                    >
                      {categories[score.category_id]?.name}
                    </TableButton>
                  </Td>
                )}
                {/* {disciplineInfo.name === 'Steel Grip' && <Td>{score.max_sg?.toFixed(2)}</Td>}
                {disciplineInfo.name === 'Steel Grip' && <Td>{score.wilks_sg?.toFixed(4)}</Td>} */}
                <Td>{score.max_sg?.toFixed(2)}</Td>
                <Td>{score.wilks_sg?.toFixed(4)}</Td>

                <Td>{score.max_sqt?.toFixed(2)}</Td>
                <Td>{score.wilks_sqt?.toFixed(4)}</Td>

                <Td>{score.max_wl?.toFixed(2)}</Td>
                <Td>{score.wilks_wl?.toFixed(4)}</Td>

                <Td>{score.max_mc?.toFixed(2)}</Td>
                <Td>{score.wilks_mc?.toFixed(4)}</Td>

                <Td>{(score.max_wl + score.max_mc + score.max_sg + score.max_sqt).toFixed(2)}</Td>
                <Td>{(score.wilks_wl + score.wilks_mc + score.wilks_sg + score.wilks_sqt).toFixed(4)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </motion.div>
  )
}

export default RankingPage
