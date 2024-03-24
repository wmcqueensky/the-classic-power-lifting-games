import supabase from '../../../config/supabase-client.js'

const fetchCategoriesForDiscipline = async (disciplineId) => {
  try {
    const {data, error} = await supabase.from('categories').select('*').eq('discipline_id', disciplineId)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching categories for competition:', error.message)
    return []
  }
}

export default fetchCategoriesForDiscipline
