import {Box, Text} from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as="footer" textAlign="center" py="4px" bg="black" color="white">
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} Classic Powerlifting Games. All rights reserved.
      </Text>
    </Box>
  )
}

export default Footer
