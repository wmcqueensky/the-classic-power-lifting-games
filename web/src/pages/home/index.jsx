import {VStack, Heading, Box, Button} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import backgroundImage from './images/background.png'
import {useNavigate} from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: {opacity: 0, x: '-100%'},
    visible: {opacity: 1, x: 0, transition: {type: 'spring', stiffness: 40}},
  }

  const headingVariants = {
    hidden: {opacity: 0, y: 0},
    visible: {opacity: 1, y: 0, transition: {delay: 0.5, type: 'spring', stiffness: 40}},
  }

  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      h="100vh"
      d="flex"
      color="white"
    >
      <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="hidden">
        <VStack textAlign="left" variants={headingVariants}>
          <Heading fontSize="6.5rem" mt="10" mr="350px" backdropFilter="blur(2px)">
            <span style={{fontWeight: 'normal'}}>THE CLASSIC</span> <br /> POWERLIFTING <br /> GAMES
          </Heading>

          <Button
            size="xxl"
            colorScheme="black"
            variant="outline"
            borderRadius="3xl"
            mt="8"
            p="8"
            fontSize="3.5rem"
            backdropFilter="blur(9px)"
            _hover={{
              bg: 'rgba(255, 0, 0, 0.4)',
              color: 'white',
            }}
            transition="all 0.3s"
            onClick={() => {
              // Use the navigate function to navigate to the desired link
              navigate('/zapisy')
            }}
          >
            Zapisz się teraz!
          </Button>
        </VStack>
      </motion.div>
    </Box>
  )
}

export default HomePage
