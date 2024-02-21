import {Box, Flex, Heading, Link, IconButton, useColorModeValue} from '@chakra-ui/react'
import {FaInstagram, FaFacebook, FaEnvelope, FaTiktok} from 'react-icons/fa'
import backgroundImage from './images/background.png'
import {motion} from 'framer-motion'

const containerVariants = {
  hidden: {opacity: 0, x: -20},
  visible: {opacity: 1, x: 0, transition: {delay: 0.5, type: 'spring', stiffness: 40}},
}

const ContactPage = () => {
  const iconColor = useColorModeValue('red', 'white')

  return (
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
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <Box
          bgColor="rgba(0, 0, 0, 0.2)"
          backdropFilter="blur(10px)"
          borderRadius="10"
          overflow="hidden"
          pt="1"
          pl="4"
          pr="4"
          pb="4"
          mt="20"
        >
          <Heading
            a="h1"
            fontSize={{base: '2rem', sm: '3rem', md: '4rem', lg: '5.5rem', xl: '6rem', '2xl': '6.5rem'}}
            mb={4}
            textAlign="center"
          >
            Zapraszamy do kontaktu
          </Heading>
          <Flex alignContent="center" justifyContent="center" flexWrap="wrap">
            <Link
              href="https://www.instagram.com/the_classic_powerlifting_games?fbclid=IwAR0cxvM_Wqz0_nIlfUQf53lS1iMS-9aed_Y2Z3cdLf_k8UamB4rR5dQ9FiY"
              isExternal
            >
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram color={iconColor} />}
                mr={[2, 4]} // Adjust the margin for different screen sizes
                variant="ghost"
                fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                pt={[4, 6]} // Adjust the padding top for different screen sizes
                pb={[4, 6]} // Adjust the padding bottom for different screen sizes
              />
            </Link>
            <Link href="https://www.facebook.com/TheClassicPowerliftingGames/" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook color={iconColor} />}
                mr={[2, 4]} // Adjust the margin for different screen sizes
                variant="ghost"
                fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                pt={[4, 6]} // Adjust the padding top for different screen sizes
                pb={[4, 6]} // Adjust the padding bottom for different screen sizes
              />
            </Link>
            <Link
              href="https://www.tiktok.com/@powerlifting_games?fbclid=IwAR3cxlE_ScDbzXTLUwAn-nHL8JiMLX2UXWUxT--F_I8M4noV9MEHKkUPrgw"
              isExternal
            >
              <IconButton
                aria-label="TikTok"
                icon={<FaTiktok color={iconColor} />}
                mr={[2, 4]}
                variant="ghost"
                fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                pt={[4, 6]} // Adjust the padding top for different screen sizes
                pb={[4, 6]} // Adjust the padding bottom for different screen sizes
              />
            </Link>
            <Link href="mailto:TheClassicPowerliftingGames@gmail.com">
              <IconButton
                aria-label="Email"
                icon={<FaEnvelope color={iconColor} />}
                variant="ghost"
                fontSize={{base: '3xl', md: '4xl', lg: '5xl'}}
                pt={[4, 6]} // Adjust the padding top for different screen sizes
                pb={[4, 6]} // Adjust the padding bottom for different screen sizes
                pl={[1, 2]} // Adjust the padding left for different screen sizes
                pr={[1, 2]} // Adjust the padding right for different screen sizes
              />
            </Link>
          </Flex>
        </Box>
      </motion.div>
    </Box>
  )
}

export default ContactPage
