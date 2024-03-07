import supabase from '../../../config/supabase-client.js'

const fetchCategoriesData = async (categoriesIds) => {
  try {
    const {data, error} = await supabase.from('categories').select('*').in('category_id', categoriesIds)

    if (error) {
      throw error
    }

    const categoryObject = {}
    data.forEach((category) => {
      categoryObject[category.category_id] = category
    })

    return categoryObject
  } catch (error) {
    console.error('Error fetching categories data:', error.message)
    return {}
  }
}

export default fetchCategoriesData
