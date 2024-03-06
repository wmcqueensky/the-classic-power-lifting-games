import supabase from '../../../config/supabase-client.js'

const fetchCompetitionInfo = async (competitionId) => {
  try {
    const {data, error} = await supabase
      .from('competitions')
      .select('name, date, place')
      .eq('competition_id', competitionId)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching competition info:', error.message)
    return null
  }
}

export default fetchCompetitionInfo
