import {Button} from '@chakra-ui/react'

const TableButton = ({onClick, children}) => (
  <Button
    as="button"
    height="24px"
    lineHeight="1.2"
    transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
    border="1px"
    px="12px"
    py="8px"
    borderRadius="6px"
    fontSize="14px"
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

export default TableButton
