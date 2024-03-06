import supabase from '../../../config/supabase-client.js'

const fetchCompetitions = async () => {
  try {
    const {data, error} = await supabase.from('competitions').select('competition_id, name')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching competitions:', error.message)
    return null
  }
}

export default fetchCompetitions
