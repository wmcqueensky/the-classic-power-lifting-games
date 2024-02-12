import {Box, Flex, Text, Image, Divider} from '@chakra-ui/react'
import {Link, useLocation} from 'react-router-dom'
import logo from '../images/logo.png' // Update the path accordingly
import {NAVBAR_HEIGHT} from '../../constants'
import {useState, useEffect} from 'react'

const Navbar = () => {
  const location = useLocation()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

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
      <Flex justify={'space-between'}>
        <Link to="/">
          <Image src={logo} alt="Logo" style={{width: '120px', height: '88px'}} ml="3" />
        </Link>
        <Flex align={'right'}>
          <Link to={'/statystyki'} style={{color: isLinkActive('/statystyki') ? 'white' : 'gray'}}>
            <Text fontSize={'x-large'} mt="6" _hover={{color: 'white'}}>
              Statystyki
            </Text>
            {isLinkActive('/statystyki') && <Divider borderBottom="2px" borderColor="red" />}
          </Link>
          <Link to={'/zapisy'} style={{color: isLinkActive('/zapisy') ? 'white' : 'gray'}}>
            <Text fontSize={'x-large'} mt="6" ml="5" _hover={{color: 'white'}}>
              Zapisy
            </Text>
            {isLinkActive('/zapisy') && <Divider borderBottom="2px" borderColor="red" ml="3" />}
          </Link>
          <Link to={'/zdjecia'} style={{color: isLinkActive('/zdjecia') ? 'white' : 'gray'}}>
            <Text fontSize={'x-large'} mt="6" ml="5" _hover={{color: 'white'}}>
              Zdjęcia
            </Text>
            {isLinkActive('/zdjecia') && <Divider borderBottom="2px" borderColor="red" ml="3" />}
          </Link>
          <Link to={'/onas'} style={{color: isLinkActive('/onas') ? 'white' : 'gray'}}>
            <Text fontSize={'x-large'} mt="6" ml="5" _hover={{color: 'white'}}>
              O Nas
            </Text>
            {isLinkActive('/onas') && <Divider borderBottom="2px" borderColor="red" ml="3" />}
          </Link>
        </Flex>
        <Text></Text>
      </Flex>
      <Box height="1px" bg="red" width="100%" />
    </Box>
  )
}

export default Navbar
