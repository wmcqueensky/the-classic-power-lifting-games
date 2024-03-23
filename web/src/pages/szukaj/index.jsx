import {Box, Heading, Input, Button, Text} from '@chakra-ui/react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'
import {LIFTER_CUSTOM_PATH, RANKING_PATH} from '../../router/paths.js'

import supabase from '../../config/supabase-client.js'
import backgroundImage from '../../common/assets/statistics-background.png'

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const handleSearch = async () => {
    const [name, surname] = searchText.split(' ')

    try {
      const {data, error} = await supabase
        .from('lifters')
        .select('lifter_id')
        .eq('first_name', name)
        .eq('last_name', surname)

      if (error) {
        throw error
      }

      if (data.length > 0 && data.length < 2) {
        const lifterId = data[0].lifter_id
        navigate(`${LIFTER_CUSTOM_PATH}${lifterId}`)
      }

      if (data.length > 1) {
        navigate(`${RANKING_PATH}`)
      }

      if (data.length === 0) {
        setShowErrorMessage(true)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  return (
    <motion.div variants={smoothVariant} initial="hidden" animate="visible">
      <Box
        bgImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading fa="h1" fontSize={{base: '2rem', xl: '2.5rem', '2xl': '3rem'}} mb={4} textAlign="center">
          Wyszukaj zawodnika po imieniu i nazwisku:
        </Heading>
        <Box display="flex" alignItems="center">
          <Input
            id="searchInput"
            type="text"
            placeholder="Wyszukaj..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            mr={2}
            size={{base: 'md', sm: 'lg'}}
          />
          <Button onClick={handleSearch} colorScheme="red">
            Szukaj
          </Button>
        </Box>
        {showErrorMessage && (
          <Text color="red" mt={2}>
            Brak wyników wyszukiwania
          </Text>
        )}
      </Box>
    </motion.div>
  )
}

export default SearchPage
