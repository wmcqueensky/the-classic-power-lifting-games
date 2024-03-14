import supabase from '../../../config/supabase-client.js'

const fetchCategoriesForGender = async (gender) => {
  try {
    const {data, error} = await supabase.from('categories').select('*').eq('gender_category', gender)

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching categories for competition:', error.message)
    return []
  }
}

export default fetchCategoriesForGender
