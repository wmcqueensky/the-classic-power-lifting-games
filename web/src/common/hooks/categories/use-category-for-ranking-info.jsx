import supabase from '../../../config/supabase-client.js'

const fetchCategoryInfo = async (categoryId) => {
  try {
    const {data, error} = await supabase
      .from('categories')
      .select('name')
      .eq('category_id', categoryId)
      .single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching category info:', error.message)
    return null
  }
}

export default fetchCategoryInfo
