import {Button} from '@chakra-ui/react'

const ChoiceButton = ({onClick, children}) => (
  <Button
    as="button"
    h={{base: '36px', md: '46px'}}
    w={{base: '280px', sm: '300px'}}
    lineHeight="1.2"
    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
    border="1px"
    p={{base: '30px', md: '50px'}}
    m="2"
    borderRadius="10px"
    fontSize={{base: '18px', md: '26px'}}
    fontWeight="semibold"
    bg="red"
    borderColor="red"
    color="white"
    boxShadow="0px 3px 6px rgba(0, 0, 0, 0.1)"
    _hover={{bg: '#DF1818', borderColor: '#DF1818'}}
    _active={{
      bg: '#cc0000',
      transform: 'scale(0.98)',
      borderColor: '#cc0000',
    }}
    onClick={onClick}
  >
    {children}
  </Button>
)

export default ChoiceButton
