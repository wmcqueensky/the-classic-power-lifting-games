import supabase from '../../../config/supabase-client.js'

const fetchDisciplines = async () => {
  try {
    const {data, error} = await supabase.from('categories').select('discipline')

    if (error) {
      throw error
    }

    const uniqueDisciplines = data.filter(
      (category, index) => data.findIndex((c) => c.discipline === category.discipline) === index
    )

    return uniqueDisciplines
  } catch (error) {
    console.error('Error fetching disciplines:', error.message)
    return []
  }
}

export default fetchDisciplines
