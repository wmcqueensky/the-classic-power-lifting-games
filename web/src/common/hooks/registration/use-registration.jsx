import supabase from '../../../config/supabase-client.js'

const fetchCompetitionsForRegistration = async () => {
  try {
    const currentDate = new Date().toISOString()
    const {data, error} = await supabase.from('registration').select('name, link').gt('deadline', currentDate)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching competitions for registration:', error.message)
    return null
  }
}

export default fetchCompetitionsForRegistration
