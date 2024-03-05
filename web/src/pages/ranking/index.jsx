import {Text, Table, Thead, Tbody, Tr, Th, Td, Box} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import supabase from '../../config/supabaseClient.js'
import TableButton from '../../common/components/tableButton.jsx'
import backgroundImage from '../../common/assets/statisticsBackground.png'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smoothSlideInAnimation.jsx'

const RankingPage = () => {
  const [competitionInfo, setCompetitionInfo] = useState({})
  const [categoryInfo, setCategoryInfo] = useState({})
  const [scores, setScores] = useState([])
  const [lifters, setLifters] = useState({})
  const [competitions, setCompetitions] = useState({})
  const [categories, setCategories] = useState({})
  const {zawody: competitionId, kategoria: categoryId} = useParams()
  const navigate = useNavigate()

  const fetchScoresForCategory = async (categoryId) => {
    try {
      const {data, error} = await supabase
        .from('categories')
        .select('*')
        .eq('category_id', categoryId)
        .single()

      if (error) {
        throw error
      }
      navigate(`/ranking/kategoria/${data.category_id}`)
    } catch (error) {
      console.error('Error fetching scores for category:', error.message)
    }
  }

  const fetchScoresForCompetition = async (competitionId) => {
    try {
      const {data, error} = await supabase
        .from('competitions')
        .select('*')
        .eq('competition_id', competitionId)
        .single()

      if (error) {
        throw error
      }
      navigate(`/ranking/zawody/${data.competition_id}`)
    } catch (error) {
      console.error('Error fetching scores for competition:', error.message)
    }
  }

  const fetchScoresForLifter = async (lifterId) => {
    try {
      const {data, error} = await supabase.from('lifters').select('*').eq('lifter_id', lifterId).single()

      if (error) {
        throw error
      }
      navigate(`/zawodnik/${data.lifter_id}`)
    } catch (error) {
      console.error('Error fetching scores for lifter:', error.message)
    }
  }

  useEffect(() => {
    const fetchCompetitionInfo = async () => {
      try {
        const {data, error} = await supabase
          .from('competitions')
          .select('name, date, place')
          .eq('competition_id', competitionId)
          .single()

        if (error) {
          throw error
        }

        setCompetitionInfo(data)
      } catch (error) {
        console.error('Error fetching competition info:', error.message)
      }
    }

    const fetchCategoryInfo = async () => {
      try {
        const {data: data, error} = await supabase
          .from('categories')
          .select('name')
          .eq('category_id', categoryId)
          .single()

        if (error) {
          throw error
        }

        setCategoryInfo(data)
      } catch (error) {
        console.error('Error fetching category info:', error.message)
      }
    }

    const fetchScoresForCompetition = async () => {
      try {
        let query = supabase.from('scores').select('*')

        if (competitionId && categoryId) {
          query = query.eq('competition_id', competitionId).eq('category_id', categoryId)
        } else if (competitionId && !categoryId) {
          query = query.eq('competition_id', competitionId)
        } else if (categoryId && !competitionId) {
          query = query.eq('category_id', categoryId)
        }

        const {data: scoresData, error} = await query

        if (error) {
          throw error
        }

        scoresData.sort((a, b) => b.wilkswl + b.wilksmc - (a.wilkswl + a.wilksmc))

        setScores(scoresData)

        const lifterIds = scoresData.map((score) => score.lifter_id)

        const {data: lifterData, error: lifterError} = await supabase
          .from('lifters')
          .select('*')
          .in('lifter_id', lifterIds)

        if (lifterError) {
          throw lifterError
        }

        const lifterObject = {}
        lifterData.forEach((lifter) => {
          lifterObject[lifter.lifter_id] = lifter
        })
        setLifters(lifterObject)

        if (!competitionId) {
          const competitionIds = scoresData.map((score) => score.competition_id)

          const {data, error} = await supabase
            .from('competitions')
            .select('*')
            .in('competition_id', competitionIds)

          if (error) {
            throw error
          }

          const competitionObject = {}
          data.forEach((competition) => {
            competitionObject[competition.competition_id] = competition
          })
          setCompetitions(competitionObject)
        }

        if (!categoryId) {
          const categoryIds = scoresData.map((score) => score.category_id)

          const {data, error} = await supabase.from('categories').select('*').in('category_id', categoryIds)

          if (error) {
            throw error
          }

          const categoryObject = {}
          data.forEach((category) => {
            categoryObject[category.category_id] = category
          })
          setCategories(categoryObject)
        }
      } catch (error) {
        console.error('Error fetching scores for competition:', error.message)
      }
    }

    if (competitionId) {
      fetchCompetitionInfo()
    }

    if (categoryId) {
      fetchCategoryInfo()
    }

    fetchScoresForCompetition()
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
                    <TableButton key={score.lifter_id} onClick={() => fetchScoresForLifter(score.lifter_id)}>
                      {lifters[score.lifter_id]?.first_name} {lifters[score.lifter_id]?.last_name}
                    </TableButton>
                  </Td>
                  <Td>{lifters[score.lifter_id]?.gender}</Td>
                  <Td>{score.weight.toFixed(2)}</Td>
                  <Td>{score.club}</Td>
                  {!competitionId && (
                    <Td>
                      <TableButton onClick={() => fetchScoresForCompetition(score.competition_id)}>
                        {competitions[score.competition_id]?.name}
                      </TableButton>
                    </Td>
                  )}
                  {!categoryId && (
                    <Td>
                      <TableButton onClick={() => fetchScoresForCategory(score.category_id)}>
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
