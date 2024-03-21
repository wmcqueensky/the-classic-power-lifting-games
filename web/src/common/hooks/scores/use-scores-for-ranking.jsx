import supabase from '../../../config/supabase-client.js'

const fetchScoresForRanking = async (competitionId, categoryId, gender) => {
  try {
    let query = supabase.from('scores').select('*')

    if (competitionId && categoryId && !gender) {
      query = query.eq('competition_id', competitionId).eq('category_id', categoryId)
    }

    if (competitionId && !categoryId && !gender) {
      query = query.eq('competition_id', competitionId)
    }

    if (categoryId && !competitionId && !gender) {
      query = query.eq('category_id', categoryId)
    }

    if (!competitionId && !categoryId && gender) {
      const {data: lifterData, error: lifterError} = await supabase
        .from('lifters')
        .select('lifter_id')
        .eq('gender', gender)

      if (lifterError) {
        throw lifterError
      }

      const lifterIds = lifterData.map((lifter) => lifter.lifter_id)
      query = query.in('lifter_id', lifterIds)
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

export default fetchScoresForRanking
