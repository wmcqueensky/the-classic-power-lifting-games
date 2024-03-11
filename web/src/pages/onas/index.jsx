import {Box, Center, Heading, Flex, Icon, Stack, Image, useBreakpointValue, Button} from '@chakra-ui/react'
import {FaDumbbell} from 'react-icons/fa'
import {useState, useEffect, useRef} from 'react'
import {motion} from 'framer-motion'
import {smoothVariant} from '../../common/animations/smooth-slide-in-animation.jsx'

import React from 'react'
import Slideshow from './components/slider.jsx'
import trainerPhoto from './images/laskiewicz.png'
import rokkPhoto from './images/rokk.png'
import backgroundImage from '/Users/goodylabs/Desktop/programs/WEB/College-Power-Lifting/web/src/common/assets/statistics-background.png'

const CustomBox = ({children}) => (
  <Box p={{base: '4', md: '8'}} w="100vw" alignItems="center" justifyContent="center">
    {children}
  </Box>
)

const AboutUsPage = () => {
  const boxRef1 = useRef(null)
  const boxRef2 = useRef(null)
  const boxRef3 = useRef(null)
  const boxRef4 = useRef(null)
  const boxRef5 = useRef(null)
  const boxRef6 = useRef(null)
  const boxRef7 = useRef(null)
  const boxRef8 = useRef(null)
  const boxRef9 = useRef(null)
  const boxRef10 = useRef(null)

  const [isVisible1, setIsVisible1] = useState(false)
  const [isVisible2, setIsVisible2] = useState(false)
  const [isVisible3, setIsVisible3] = useState(false)
  const [isVisible4, setIsVisible4] = useState(false)
  const [isVisible5, setIsVisible5] = useState(false)
  const [isVisible6, setIsVisible6] = useState(false)
  const [isVisible7, setIsVisible7] = useState(false)
  const [isVisible8, setIsVisible8] = useState(false)
  const [isVisible9, setIsVisible9] = useState(false)
  const [isVisible10, setIsVisible10] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (boxRef1.current && window.scrollY > boxRef1.current.offsetTop - window.innerHeight) {
        setIsVisible1(true)
      }
      if (boxRef2.current && window.scrollY > boxRef2.current.offsetTop - window.innerHeight) {
        setIsVisible2(true)
      }

      if (boxRef3.current && window.scrollY > boxRef3.current.offsetTop - window.innerHeight) {
        setIsVisible3(true)
      }

      if (boxRef4.current && window.scrollY > boxRef4.current.offsetTop - window.innerHeight) {
        setIsVisible4(true)
      }

      if (boxRef5.current && window.scrollY > boxRef5.current.offsetTop - window.innerHeight) {
        setIsVisible5(true)
      }

      if (boxRef6.current && window.scrollY > boxRef6.current.offsetTop - window.innerHeight) {
        setIsVisible6(true)
      }

      if (boxRef7.current && window.scrollY > boxRef7.current.offsetTop - window.innerHeight) {
        setIsVisible7(true)
      }

      if (boxRef8.current && window.scrollY > boxRef8.current.offsetTop - window.innerHeight) {
        setIsVisible8(true)
      }

      if (boxRef9.current && window.scrollY > boxRef9.current.offsetTop - window.innerHeight) {
        setIsVisible9(true)
      }

      if (boxRef10.current && window.scrollY > boxRef10.current.offsetTop - window.innerHeight) {
        setIsVisible10(true)
      }
    }

    setIsVisible1(true)
    window.scrollTo(0, 0)

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isLargeScreen = useBreakpointValue({base: false, lg: true})

  const staffMembers = [
    {name: 'John Doe', role: 'CEO', imageUrl: trainerPhoto},
    {name: 'Jane Smith', role: 'CTO', imageUrl: trainerPhoto},
    {name: 'Alice Johnson', role: 'Marketing Manager', imageUrl: trainerPhoto},
    {name: 'Bob Williams', role: 'Lead Developer', imageUrl: trainerPhoto},
  ]

  const sponsors = [{name: 'ROKK', link: 'https://rokk-sport.pl/', imageUrl: rokkPhoto}]

  return (
    <Box bgImage={`url(${backgroundImage})`} backgroundSize="cover" backgroundPosition="center" h="100%">
      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible1 ? 'visible' : 'hidden'}
        ref={boxRef1}
      >
        <Center pb={2}>
          <Heading as="h1" size={['xl', '2xl', '3xl', '4xl']} pt="5">
            O nas
          </Heading>
        </Center>

        <Slideshow />
      </motion.div>

      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible2 ? 'visible' : 'hidden'}
        ref={boxRef2}
      >
        <Box p="8" w="100vw" display="flex" alignItems="center" justifyContent="center">
          <Heading as="h1" size={{base: '2xl', lg: '4xl'}}>
            Kim jesteśmy<span style={{color: 'red'}}>?</span>
          </Heading>
        </Box>
      </motion.div>

      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible3 ? 'visible' : 'hidden'}
        ref={boxRef3}
      >
        <CustomBox>
          <Heading as="h1" size={{base: 'xl', lg: '2xl'}} p="10">
            <Icon as={FaDumbbell} mr="2" color="red" />
            <span style={{color: 'red'}}>Lorem ipsum dolor sit amet</span>, consectetur adipiscing elit.
            Phasellus volutpat leo mi, ut pretium ex euismod sed. Cras viverra felis ut diam tristique, et
            gravida neque rutrum.
          </Heading>
        </CustomBox>
      </motion.div>

      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible4 ? 'visible' : 'hidden'}
        ref={boxRef4}
      >
        <CustomBox>
          <Heading as="h1" size={{base: 'xl', lg: '2xl'}} p="10">
            <Icon as={FaDumbbell} mr="2" color="red" />
            <span style={{color: 'red'}}>Donec mauris quam</span>, convallis in pellentesque vitae, semper
            congue nunc. Donec tempor auctor lacus non pretium.
          </Heading>
        </CustomBox>
      </motion.div>

      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible5 ? 'visible' : 'hidden'}
        ref={boxRef5}
      >
        <CustomBox>
          <Heading as="h1" size={{base: 'xl', lg: '2xl'}} p="10">
            <Icon as={FaDumbbell} mr="2" color="red" />
            <span style={{color: 'red'}}>Sed sed tincidunt velit</span>. Praesent quis dolor in sem faucibus
            ullamcorper ac sed quam. Proin elit justo, vulputate at laoreet sed, dictum id odio.
          </Heading>
        </CustomBox>
      </motion.div>

      <motion.div
        variants={smoothVariant}
        initial="hidden"
        animate={isVisible6 ? 'visible' : 'hidden'}
        ref={boxRef6}
      >
        <Stack alignItems="center" direction={isLargeScreen ? 'row' : 'column'}>
          <Flex flex="1">
            <Image src={trainerPhoto} alt="Marcin Laskiewicz" p="50" />
          </Flex>
          <Flex flex="1">
            <Heading pr="50" pl={isLargeScreen ? '0' : '50'} fontSize={{base: '2xl', md: '3xl', lg: '4xl'}}>
              <span style={{color: 'red'}}>Meet our dedicated trainer</span>, John Doe. With years of
              experience in the field, John is passionate about helping individuals achieve their fitness
              goals and lead a healthier lifestyle.
            </Heading>
          </Flex>
        </Stack>
      </motion.div>

      <Box p="8" w="100vw" alignItems="center" justifyContent="left" mt="500">
        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible7 ? 'visible' : 'hidden'}
          ref={boxRef7}
        >
          <Heading as="h1" size="2xl">
            Członkowie zespołu:
          </Heading>
        </motion.div>
        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible8 ? 'visible' : 'hidden'}
          ref={boxRef8}
        >
          <Flex alignItems="center" justifyContent="left" flexWrap="wrap">
            {staffMembers.map((staff, index) => (
              <Box key={index} m="4" textAlign="center">
                <Box
                  bg="gray.200"
                  borderRadius="full"
                  w={{base: '120px', lg: '140px'}}
                  h={{base: '120px', lg: '140px'}}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mx="auto"
                >
                  <Image src={staff.imageUrl} alt={staff.name} borderRadius="full" w="100%" h="100%" />
                </Box>
                <Heading as="h2" size={{base: 'md', lg: 'lg'}} mt="4">
                  {staff.name}
                </Heading>
                <Heading as="h3" size={{base: 'md', lg: 'lg'}} color="red">
                  {staff.role}
                </Heading>
              </Box>
            ))}
          </Flex>
        </motion.div>
      </Box>

      <Box p="8" w="100vw" alignItems="center" justifyContent="left">
        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible9 ? 'visible' : 'hidden'}
          ref={boxRef9}
        >
          <Heading as="h1" size="2xl">
            Sponsorzy:
          </Heading>
        </motion.div>

        <motion.div
          variants={smoothVariant}
          initial="hidden"
          animate={isVisible10 ? 'visible' : 'hidden'}
          ref={boxRef10}
        >
          <Flex alignItems="center" justifyContent="left" flexWrap="wrap">
            {sponsors.map((sponsor, index) => (
              <Box key={index} m="4" textAlign="center">
                <Button
                  as="a"
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="unstyled"
                >
                  <Box
                    bg="black.200 "
                    borderWidth="2px"
                    borderColor="white"
                    borderRadius="full"
                    w={{base: '160px', lg: '200px'}}
                    h={{base: '160px', lg: '200px'}}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                  >
                    <Image src={sponsor.imageUrl} alt={sponsor.name} borderRadius="full" />
                  </Box>
                  <Heading as="h2" size={{base: 'md', lg: 'lg'}} mt="4">
                    {sponsor.name}
                  </Heading>
                </Button>
              </Box>
            ))}
          </Flex>
        </motion.div>
      </Box>
    </Box>
  )
}

export default AboutUsPage
