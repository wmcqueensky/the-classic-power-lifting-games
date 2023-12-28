import {VStack, Heading, Box} from '@chakra-ui/react'
import backgroundImage from './images/background.png'

const HomePage = () => {
  return (
    <Box
      bgImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      backgroundPosition="center"
      h="100vh"
      d="flex"
      alignItems="left"
      color="white"
    >
      <VStack textAlign="left" mr="350px">
        <Heading fontSize="5.5rem">
          <span style={{fontWeight: 'normal'}}>THE CLASSIC</span> <br /> POWERLIFTING <br /> GAMES
        </Heading>
      </VStack>
    </Box>
  )
}

export default HomePage
