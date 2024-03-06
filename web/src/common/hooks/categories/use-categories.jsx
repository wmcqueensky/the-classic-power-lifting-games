import supabase from '../../../config/supabase-client.js'

const fetchAllCategories = async () => {
  try {
    const {data, error} = await supabase.from('categories').select('*')

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching all categories:', error.message)
    return []
  }
}

export default fetchAllCategories
