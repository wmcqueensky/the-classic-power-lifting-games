import supabase from '../../../config/supabase-client.js'

const fetchCompetitionsData = async (competitionIds) => {
  try {
    const {data, error} = await supabase.from('competitions').select('*').in('competition_id', competitionIds)

    if (error) {
      throw error
    }

    const competitionObject = {}
    data.forEach((competition) => {
      competitionObject[competition.competition_id] = competition
    })

    return competitionObject
  } catch (error) {
    console.error('Error fetching competitions data:', error.message)
    return {}
  }
}

export default fetchCompetitionsData
