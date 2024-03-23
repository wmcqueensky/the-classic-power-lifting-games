import {Text, Table, Thead, Tbody, Tr, Th, Td, Box} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import {useNavigate, useParams} from 'react-router-dom'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {RANKING_COMPETITION_CUSTOM_PATH, RANKING_CATEGORY_CUSTOM_PATH} from '../../router/paths.js'

import supabase from '../../config/supabase-client.js'
import TableButton from '../../common/components/table-button.jsx'
import backgroundImage from '../../common/assets/statistics-background.png'

import fetchInfoForLifter from '../../common/hooks/lifters/use-lifter-for-info.jsx'

const LifterPage = () => {
  const [lifter, setLifterData] = useState(0)
  const [scores, setScores] = useState([])
  const [competitions, setCompetitions] = useState([])
  const [categories, setCategories] = useState([])
  const {zawodnik: lifterId} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    const fetchLifterInfo = async () => {
      const data = await fetchInfoForLifter(lifterId)

      if (data) {
        setLifterData(data)
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
    fetchLifterInfo()
  }, [lifterId])

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
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
                  <Th>SteelGrip</Th>
                  <Th>Squat</Th>
                  <Th>Deadlift</Th>
                  <Th>Bench</Th>
                  <Th>Total</Th>
                  <Th>Wilks</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{scores[0].max_sg?.toFixed(2)}</Td>
                  <Td>{scores[0].max_sqt?.toFixed(2)}</Td>
                  <Td>{scores[0].max_wl?.toFixed(2)}</Td>
                  <Td>{scores[0].max_mc?.toFixed(2)}</Td>
                  <Td>
                    {(scores[0].max_wl + scores[0].max_mc + scores[0].max_sg + scores[0].max_sqt).toFixed(2)}
                  </Td>
                  <Td>
                    {(
                      scores[0].wilks_wl +
                      scores[0].wilks_mc +
                      scores[0].wilks_sg +
                      scores[0].wilks_sqt
                    ).toFixed(4)}
                  </Td>
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
                <Th>Ranking</Th>
                <Th>Waga</Th>
                <Th>Klub</Th>
                <Th>Data</Th>
                <Th>Zawody</Th>
                <Th>Kategoria</Th>
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
                  <Td>{score.weight.toFixed(2)}</Td>
                  <Td>{score.club}</Td>
                  <Td>{competitions[score.competition_id]?.date}</Td>

                  <Td>
                    <TableButton
                      onClick={() => navigate(`${RANKING_COMPETITION_CUSTOM_PATH}${score.competition_id}`)}
                    >
                      {competitions[score.competition_id]?.name}
                    </TableButton>
                  </Td>

                  <Td>
                    <TableButton
                      onClick={() => navigate(`${RANKING_CATEGORY_CUSTOM_PATH}${score.category_id}`)}
                    >
                      {categories[score.category_id]?.name}
                    </TableButton>
                  </Td>

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
      </Box>
    </motion.div>
  )
}

export default LifterPage
