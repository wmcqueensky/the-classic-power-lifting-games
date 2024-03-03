import {Box, Flex, Text, Image, Divider, useDisclosure, IconButton} from '@chakra-ui/react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../images/logo.png'
import {FiMenu} from 'react-icons/fi'
import {NAVBAR_HEIGHT} from '../../constants'
import {useState, useEffect} from 'react'

const NavLink = ({to, active, children, onClose}) => (
  <Link to={to} style={{textDecoration: 'none', color: active ? 'white' : 'gray'}} onClick={onClose}>
    <Text
      fontSize={{base: 'lg', md: 'xl', lg: '2xl'}}
      mt={{base: '8', lg: '6'}}
      ml={{base: '2', md: '3'}}
      mr={{base: '2', md: '3'}}
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
      <NavLink to="/" active={false} onClose={onClose}>
        Strona Główna
      </NavLink>
      <NavLink to="/statystyki" active={false} onClose={onClose}>
        Statystyki
      </NavLink>
      <NavLink to="/zapisy" active={false} onClose={onClose}>
        Zapisy
      </NavLink>
      <NavLink to="/onas" active={false} onClose={onClose}>
        O Nas
      </NavLink>
      <NavLink to="/kontakt" active={false} onClose={onClose}>
        Kontakt
      </NavLink>
    </Flex>
  </Box>
)

const Navbar = () => {
  const location = useLocation()
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isScrollingUp = prevScrollPos > currentScrollPos

      setVisible(isScrollingUp || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)

      if (isOpen) {
        onClose()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos, isOpen, onClose])

  const isLinkActive = (page) => location.pathname === page

  return (
    <Box
      position="fixed"
      width={'100%'}
      fontSize={'x-large'}
      height={NAVBAR_HEIGHT}
      bg="#121212"
      transition="top 0.3s"
      boxShadow={visible ? '0 0 10px rgba(0, 0, 0, 0.3)' : 'none'}
      pointerEvents={visible ? 'auto' : 'none'}
      top={visible ? 0 : -88}
      zIndex="999"
    >
      <Flex justify={'space-between'} mr="10">
        <Link to="/" onClick={onClose}>
          <Image src={logo} alt="Logo" maxW="120px" maxH="88px" ml="3" />
        </Link>
        <Flex display={{base: 'none', md: 'flex'}} align={'right'}>
          <NavLink to="/" active={isLinkActive('/')} onClose={onClose}>
            Strona Główna
          </NavLink>
          <NavLink to="/statystyki" active={isLinkActive('/statystyki')} onClose={onClose}>
            Statystyki
          </NavLink>
          <NavLink to="/zapisy" active={isLinkActive('/zapisy')} onClose={onClose}>
            Zapisy
          </NavLink>
          <NavLink to="/onas" active={isLinkActive('/onas')} onClose={onClose}>
            O Nas
          </NavLink>
          <NavLink to="/kontakt" active={isLinkActive('/kontakt')} onClose={onClose}>
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
