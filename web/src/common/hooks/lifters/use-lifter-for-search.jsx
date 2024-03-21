import supabase from '/Users/goodylabs/Desktop/programs/WEB/College-Power-Lifting/web/src/config/supabase-client.js'

export const fetchLifter = async (
  name,
  surname,
  navigate,
  setShowErrorMessage,
  LIFTER_CUSTOM_PATH,
  RANKING_PATH
) => {
  try {
    const {data, error} = await supabase
      .from('lifters')
      .select('lifter_id')
      .eq('first_name', name)
      .eq('last_name', surname)

    if (error) {
      throw error
    }

    if (data.length > 0 && data.length < 2) {
      const lifterId = data[0].lifter_id
      navigate(`${LIFTER_CUSTOM_PATH}${lifterId}`)
    }

    if (data.length > 1) {
      navigate(`${RANKING_PATH}`)
    }

    if (data.length === 0) {
      setShowErrorMessage(true)
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}
