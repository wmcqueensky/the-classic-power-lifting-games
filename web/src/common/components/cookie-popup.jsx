import {Button, Text, Spacer, Flex} from '@chakra-ui/react'

const CookiePopup = ({onAccept, onDecline}) => {
  return (
    <Flex
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      bg="#121212"
      p="6"
      borderRadius="md"
      boxShadow="md"
      alignItems="right"
      w="40%"
      zIndex="999"
    >
      <Text mt="2" color="white" fontWeight="500">
        Ta strona używa statystycznych plików cookie.
      </Text>
      <Spacer />
      <Button mx="2" onClick={onAccept} bg="red" color="white" _hover={{bg: '#DF1818'}}>
        Akceptuj
      </Button>
      <Button mx="2" onClick={onDecline} bg="red" color="white" _hover={{bg: '#DF1818'}}>
        Odrzuć
      </Button>
    </Flex>
  )
}

export default CookiePopup
