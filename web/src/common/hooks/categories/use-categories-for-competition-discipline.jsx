import supabase from '../../../config/supabase-client.js'

const fetchCategoriesForCompetitionDiscipline = async (competitionId, disciplineId) => {
  try {
    const {data: scoreData, error: scoresError} = await supabase
      .from('scores')
      .select('category_id')
      .eq('competition_id', competitionId)

    if (scoresError) {
      throw scoresError
    }

    const categoryIds = [...new Set(scoreData.map((score) => score.category_id))]

    const {data: fetchedCategoriesData, error: categoriesError} = await supabase
      .from('categories')
      .select('*')
      .in('category_id', categoryIds)
      .eq('discipline_id', disciplineId)

    if (categoriesError) {
      throw categoriesError
    }

    return fetchedCategoriesData
  } catch (error) {
    console.error('Error fetching categories for competition:', error.message)
    return []
  }
}

export default fetchCategoriesForCompetitionDiscipline
