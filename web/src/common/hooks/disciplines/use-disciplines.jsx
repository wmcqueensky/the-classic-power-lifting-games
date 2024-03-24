import supabase from '../../../config/supabase-client.js'

const fetchDisciplines = async () => {
  try {
    const {data, error} = await supabase.from('disciplines').select('*')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching disciplines:', error.message)
    return []
  }
}

export default fetchDisciplines
