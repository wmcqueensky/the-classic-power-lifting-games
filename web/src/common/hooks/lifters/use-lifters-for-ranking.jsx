import supabase from '../../../config/supabase-client.js'

const fetchLiftersData = async (lifterIds) => {
  try {
    const {data: lifterData, error: lifterError} = await supabase
      .from('lifters')
      .select('*')
      .in('lifter_id', lifterIds)

    if (lifterError) {
      throw lifterError
    }

    const lifterObject = {}
    lifterData.forEach((lifter) => {
      lifterObject[lifter.lifter_id] = lifter
    })

    return lifterObject
  } catch (error) {
    console.error('Error fetching lifters data:', error.message)
    return {}
  }
}

export default fetchLiftersData
