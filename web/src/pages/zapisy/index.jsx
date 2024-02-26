import {Box, Link, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import supabase from '../../config/supabaseClient.js'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statisticsBackground.png'
import ChoiceButton from '../../common/components/choiceButton.jsx'

const containerVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0, transition: {delay: 0.5, type: 'spring', stiffness: 40}},
}

const RegistrationPage = () => {
  const [registration, setRegistration] = useState([])

  useEffect(() => {
    const fetchCompetitionsForRegistration = async () => {
      try {
        const currentDate = new Date().toISOString()
        const {data, error} = await supabase
          .from('registration')
          .select('name, link')
          .gt('deadline', currentDate)

        if (error) {
          throw error
        }

        setRegistration(data)
      } catch (error) {
        console.error('Error fetching competitions for registration:', error.message)
      }
    }

    fetchCompetitionsForRegistration()
  }, [])

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Box
        bgImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}} mb={4} textAlign="center">
          Przyszłe zawody:
        </Heading>
        {registration.map((competition) => (
          <Link href={competition.link} isExternal>
            <ChoiceButton key={competition.name}>{competition.name}</ChoiceButton>
          </Link>
        ))}
      </Box>
    </motion.div>
  )
}

export default RegistrationPage
