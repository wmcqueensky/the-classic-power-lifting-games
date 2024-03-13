import supabase from '../../../config/supabase-client.js'
import {calculateWilksCoefficient} from '../../../utils/wilks-calculator.js'
import fetchLiftersData from '../lifters/use-lifters-for-ranking.jsx'

const fetchScoresForRanking = async (competitionId, categoryId) => {
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

    // Fetch lifters data
    const lifterIds = scoresData.map((score) => score.lifter_id)
    const lifterData = await fetchLiftersData(lifterIds)

    // Calculate Wilks coefficients and sort the scores array
    const sortedScores = scoresData.sort((a, b) => {
      const wilksA =
        calculateWilksCoefficient(lifterData[a.lifter_id]?.gender, a.makswl) +
        calculateWilksCoefficient(lifterData[a.lifter_id]?.gender, a.maksmc)
      const wilksB =
        calculateWilksCoefficient(lifterData[b.lifter_id]?.gender, b.makswl) +
        calculateWilksCoefficient(lifterData[b.lifter_id]?.gender, b.maksmc)
      return wilksB - wilksA
    })

    return sortedScores
  } catch (error) {
    console.error('Error fetching scores for competition:', error.message)
    return []
  }
}

export default fetchScoresForRanking
