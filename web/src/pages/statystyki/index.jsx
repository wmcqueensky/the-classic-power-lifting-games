import {Box, Heading, VStack} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {SEARCH_PATH, COMPETITIONS_PATH} from '../../router/paths.js'

import backgroundImage from '../../common/assets/statistics-background.png'
import ChoiceButton from '../../common/components/choice-button.jsx'

const StatisticsPage = () => {
  const navigate = useNavigate()

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
        <Heading
          fa="h1"
          fontSize={{base: '2rem', lg: '3rem', xl: '3.5rem', '2xl': '4rem'}}
          mb={4}
          textAlign="center"
        >
          Wybierz sposób szukania statystyk:
        </Heading>
        <VStack maxH="70vh" overflowY="auto">
          <ChoiceButton onClick={() => navigate(`${SEARCH_PATH}`)}>Szukaj zawodnika</ChoiceButton>
          <ChoiceButton onClick={() => navigate(`${COMPETITIONS_PATH}`)}>Szukaj rankingu</ChoiceButton>
        </VStack>
      </Box>
    </motion.div>
  )
}

export default StatisticsPage
