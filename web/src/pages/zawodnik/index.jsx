import {Text, Table, Thead, Tbody, Tr, Th, Td, Button, Box} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient.js'
import TableButton from '../../common/components/tableButton.jsx'
import backgroundImage from '../../common/assets/statisticsBackground.png'
import {motion} from 'framer-motion'
import {useNavigate, useParams} from 'react-router-dom'

const containerVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0, transition: {delay: 0.5, type: 'spring', stiffness: 40}},
}

const LifterPage = () => {
  const [lifter, setLifterData] = useState(0)
  const [scores, setScores] = useState([])
  const [competitions, setCompetitions] = useState([])
  const [categories, setCategories] = useState([])
  const {zawodnik: lifterId} = useParams()

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

  useEffect(() => {
    const fetchInfoForLifter = async () => {
      try {
        const {data, error} = await supabase.from('lifters').select('*').eq('lifter_id', lifterId).single()

        if (error) {
          throw error
        }

        setLifterData(data)
      } catch (error) {
        console.error('Error fetching data for lifter', error.message)
      }
    }

    const fetchScoresForLifter = async () => {
      try {
        const {data: categoryData, error: categoryError} = await supabase.from('categories').select('*')

        if (categoryError) {
          throw categoryError
        }

        const categoryObject = {}
        categoryData.forEach((category) => {
          categoryObject[category.category_id] = category
        })
        setCategories(categoryObject)

        const {data: competitionData, error: competitionError} = await supabase
          .from('competitions')
          .select('*')

        if (competitionError) {
          throw competitionError
        }

        const competitionObject = {}
        competitionData.forEach((competition) => {
          competitionObject[competition.competition_id] = competition
        })
        setCompetitions(competitionObject)

        const {data: scoreData, error: scoreError} = await supabase
          .from('scores')
          .select('*')
          .eq('lifter_id', lifterId)

        if (scoreError) {
          throw scoreError
        }

        scoreData.sort((a, b) => b.wilkswl + b.wilksmc - (a.wilkswl + a.wilksmc))

        setScores(scoreData)
      } catch (error) {
        console.error('Error fetching data:', error.message)
      }
    }

    fetchScoresForLifter()
    fetchInfoForLifter()
  }, [lifterId])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box bgImage={`url(${backgroundImage})`} backgroundSize="cover" backgroundPosition="center" h="100%">
        <Text fontSize="4xl" fontWeight="bold" mb="4">
          {lifter.first_name} {lifter.last_name} ({lifter.gender})
        </Text>

        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Rekordy osobiste
        </Text>

        <Box overflowX="auto" mb="8">
          {scores.length > 0 && (
            <Table variant="striped" colorScheme="blackAlpha" minWidth="100%">
              <Thead>
                <Tr>
                  <Th>Maks WL [Kg]</Th>
                  <Th>Maks MC [Kg]</Th>
                  <Th>Total [Kg]</Th>
                  <Th>Wilks</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{scores[0].makswl.toFixed(2)}</Td>
                  <Td>{scores[0].maksmc.toFixed(2)}</Td>
                  <Td>{(scores[0].makswl + scores[0].maksmc).toFixed(2)}</Td>
                  <Td>{(scores[0].wilkswl + scores[0].wilksmc).toFixed(4)}</Td>
                </Tr>
              </Tbody>
            </Table>
          )}
        </Box>

        <Text fontSize="2xl" fontWeight="bold" mb="4">
          Wyniki zawodów
        </Text>

        <Box overflowX="auto">
          <Table variant="striped" colorScheme="blackAlpha" minWidth="100%">
            <Thead>
              <Tr>
                <Th>Miejsce</Th>
                <Th>Waga [Kg]</Th>
                <Th>Klub</Th>
                <Th>Data</Th>
                <Th>Zawody</Th>
                <Th>Kategoria</Th>
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
                  <Td>{score.weight.toFixed(2)}</Td>
                  <Td>{score.club}</Td>
                  <Td>{competitions[score.competition_id]?.date}</Td>
                  <Td>
                    <TableButton onClick={() => fetchScoresForCompetition(score.competition_id)}>
                      {competitions[score.competition_id]?.name}
                    </TableButton>
                  </Td>
                  <Td>
                    <TableButton onClick={() => fetchScoresForCategory(score.category_id)}>
                      {categories[score.category_id]?.name}
                    </TableButton>
                  </Td>
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

export default LifterPage
