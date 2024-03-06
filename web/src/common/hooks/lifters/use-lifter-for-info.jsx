import supabase from '../../../config/supabase-client.js'

const fetchInfoForLifter = async (lifterId) => {
  try {
    const {data, error} = await supabase.from('lifters').select('*').eq('lifter_id', lifterId).single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching data for lifter', error.message)
    return null
  }
}

export default fetchInfoForLifter
