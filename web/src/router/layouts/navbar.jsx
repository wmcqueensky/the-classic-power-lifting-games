import {Box, Flex, Text, Image, Divider, useDisclosure, IconButton} from '@chakra-ui/react'
import {Link, useLocation} from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import {NAVBAR_HEIGHT} from '../../constants'
import {HOME_PATH, STATISTICS_PATH, REGISTRATION_PATH, CONTACT_PATH} from '../../router/paths.js'
import logo from '../images/logo.png'

const NavLink = ({to, active, children, onClose}) => (
  <Link to={to} style={{textDecoration: 'none', color: active ? 'white' : 'gray'}} onClick={onClose}>
    <Text
      fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}
      mt={{base: '8', lg: '6'}}
      ml={{base: '1', md: '2'}}
      mr={{base: '1', md: '2'}}
      _hover={{color: 'white'}}
    >
      {children}
    </Text>
    {active && <Divider borderBottom="2px" borderColor="red" />}
  </Link>
)

const Drawer = ({isOpen, onClose}) => (
  <Box
    position="fixed"
    top="80px"
    right="0"
    w="200px"
    h="100%"
    bg="#121212"
    color="white"
    boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
    transform={`translateX(${isOpen ? '0' : '100%'})`}
    transition="transform 0.3s ease-in-out"
    zIndex="998"
  >
    <Flex direction="column" p="3">
      <NavLink to={HOME_PATH} active={false} onClose={onClose}>
        Strona Główna
      </NavLink>
      <NavLink to={STATISTICS_PATH} active={false} onClose={onClose}>
        Statystyki
      </NavLink>
      <NavLink to={REGISTRATION_PATH} active={false} onClose={onClose}>
        Zapisy
      </NavLink>
      <NavLink to={CONTACT_PATH} active={false} onClose={onClose}>
        Kontakt
      </NavLink>
    </Flex>
  </Box>
)

const Navbar = () => {
  const location = useLocation()
  const {isOpen, onOpen, onClose} = useDisclosure()

  const isLinkActive = (page) => location.pathname === page

  return (
    <Box
      position="fixed"
      width={'100%'}
      fontSize={'x-large'}
      height={NAVBAR_HEIGHT}
      bg="#121212"
      transition="top 0.3s"
      boxShadow={'0 0 10px rgba(0, 0, 0, 0.3)'}
      top={0}
      zIndex="999"
    >
      <Flex justify={'space-between'} mr="10">
        <Link to={HOME_PATH} onClick={onClose}>
          <Image src={logo} alt="Logo" maxW="120px" maxH="88px" ml="3" />
        </Link>
        <Flex display={{base: 'none', md: 'flex'}} align={'right'}>
          <NavLink to={HOME_PATH} active={isLinkActive(HOME_PATH)} onClose={onClose}>
            Strona Główna
          </NavLink>
          <NavLink to={STATISTICS_PATH} active={isLinkActive(STATISTICS_PATH)} onClose={onClose}>
            Statystyki
          </NavLink>
          <NavLink to={REGISTRATION_PATH} active={isLinkActive(REGISTRATION_PATH)} onClose={onClose}>
            Zapisy
          </NavLink>
          <NavLink to={CONTACT_PATH} active={isLinkActive(CONTACT_PATH)} onClose={onClose}>
            Kontakt
          </NavLink>
        </Flex>

        <IconButton
          display={{base: 'flex', md: 'none'}}
          aria-label="Menu"
          icon={<FiMenu />}
          color="white"
          colorScheme="black"
          onClick={isOpen ? onClose : onOpen}
          variant="outline"
          mt="6"
          outline="none"
        />
        <Drawer isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Box height="1px" bg="red" width="100%" />
    </Box>
  )
}

export default Navbar
