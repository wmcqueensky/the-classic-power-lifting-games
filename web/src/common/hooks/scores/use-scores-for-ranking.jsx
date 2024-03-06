import supabase from '../../../config/supabase-client.js'

const fetchScoresForCompetition = async (competitionId, categoryId) => {
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

    return scoresData
  } catch (error) {
    console.error('Error fetching scores for competition:', error.message)
    return []
  }
}

export default fetchScoresForCompetition
