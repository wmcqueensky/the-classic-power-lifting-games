import supabase from '../../../config/supabase-client.js'

const fetchScoresForRanking = async (competitionId, categoryId, gender, disciplineId) => {
  try {
    let query = supabase.from('scores').select('*')

    if (competitionId && categoryId && !gender && !disciplineId) {
      query = query.eq('competition_id', competitionId).eq('category_id', categoryId)
    }

    if (competitionId && !categoryId && !gender && !disciplineId) {
      query = query.eq('competition_id', competitionId)
    }

    if (categoryId && !competitionId && !gender && !disciplineId) {
      query = query.eq('category_id', categoryId)
    }

    if ((competitionId || !competitionId) && !categoryId && gender && !disciplineId) {
      const {data: lifterData, error: lifterError} = await supabase
        .from('lifters')
        .select('lifter_id')
        .eq('gender', gender)

      if (lifterError) {
        throw lifterError
      }

      const lifterIds = lifterData.map((lifter) => lifter.lifter_id)
      query = query.in('lifter_id', lifterIds)
    }

    if (!competitionId && !categoryId && !gender && disciplineId) {
      const {data: categoryData, error: categoryError} = await supabase //git
        .from('categories')
        .select('category_id')
        .eq('discipline_id', disciplineId)

      if (categoryError) {
        throw categoryError
      }

      const categoryIds = categoryData.map((category) => category.category_id)
      query = query.in('category_id', categoryIds)
    }

    if (competitionId && !categoryId && !gender && disciplineId) {
      const {data: categoryData, error: categoryError} = await supabase //git
        .from('categories')
        .select('category_id')
        .eq('discipline_id', disciplineId)

      if (categoryError) {
        throw categoryError
      }

      const categoryIds = categoryData.map((category) => category.category_id)
      query = query.eq('competition_id', competitionId).in('category_id', categoryIds)
    }

    if (!competitionId && !categoryId && gender && disciplineId) {
      const {data: categoryData, error: categoryError} = await supabase //git
        .from('categories')
        .select('category_id')
        .eq('discipline_id', disciplineId)
        .eq('gender_category', gender)

      if (categoryError) {
        throw categoryError
      }

      const categoryIds = categoryData.map((category) => category.category_id)
      query = query.in('category_id', categoryIds)
    }

    if (competitionId && !categoryId && gender && disciplineId) {
      const {data: categoryData, error: categoryError} = await supabase //git
        .from('categories')
        .select('category_id')
        .eq('discipline_id', disciplineId)
        .eq('gender_category', gender)

      if (categoryError) {
        throw categoryError
      }

      const categoryIds = categoryData.map((category) => category.category_id)
      query = query.eq('competition_id', competitionId).in('category_id', categoryIds)
    }

    const {data: scoresData, error} = await query

    if (error) {
      throw error
    }

    scoresData.sort(
      (a, b) =>
        b.wilks_wl +
        b.wilks_mc +
        b.wilks_sg +
        b.wilks_sqt -
        (a.wilks_wl + a.wilks_mc + b.wilks_sg + b.wilks_sqt)
    )

    return scoresData
  } catch (error) {
    console.error('Error fetching scores for competition:', error.message)
    return []
  }
}

export default fetchScoresForRanking
