import {Box, Link, Heading} from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {motion} from 'framer-motion'
import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import fetchCompetitionsForRegistration from '../../common/hooks/registration/use-registration.jsx'

const RegistrationPage = () => {
  const [registration, setRegistration] = useState([])

  useEffect(() => {
    const fetchCompetitions = async () => {
      const data = await fetchCompetitionsForRegistration()
      if (data) {
        setRegistration(data)
      }
    }

    fetchCompetitions()
  }, [])

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
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
          <Link key={competition.name} href={competition.link} isExternal>
            <ChoiceButton>{competition.name}</ChoiceButton>
          </Link>
        ))}
      </Box>
    </motion.div>
  )
}

export default RegistrationPage
