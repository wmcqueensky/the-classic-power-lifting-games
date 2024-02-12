import {Box, Flex, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import Navbar from './navbar'
import Footer from './footer'
import {NAVBAR_HEIGHT} from '../../constants'

const Layout = () => {
  return (
    <>
      <Stack minH="100vh">
        <Navbar />
        <Flex minH={400} align="right" w="100%" mt={NAVBAR_HEIGHT}>
          <Box w="full" h="auto">
            <Outlet />
          </Box>
        </Flex>
        <Footer />
      </Stack>
    </>
  )
}

export default Layout
