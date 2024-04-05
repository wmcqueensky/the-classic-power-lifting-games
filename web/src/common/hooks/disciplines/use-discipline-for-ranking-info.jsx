import supabase from '../../../config/supabase-client.js'

const fetchDisciplineInfo = async (disciplineId) => {
  try {
    const {data, error} = await supabase
      .from('disciplines')
      .select('*')
      .eq('discipline_id', disciplineId)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching discipline info:', error.message)
    return null
  }
}

export default fetchDisciplineInfo
