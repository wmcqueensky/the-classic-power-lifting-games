import {Box, Flex, Stack} from '@chakra-ui/react'
import {Outlet} from 'react-router'

import Navbar from './navbar'

const Layout = () => {
  return (
    <>
      <Stack minH="100vh">
        <Flex p={4} minH={400} pt={50} align="right" w="100%" pb={`50`}>
          <Box w="full">
            <Outlet />
          </Box>
        </Flex>
        <Navbar />
      </Stack>
    </>
  )
}

export default Layout
