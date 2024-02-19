import React from 'react'
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import manPhoto from '../images/mezczyzni.png'
import womanPhoto from '../images/panie.png'
import paraolimpicsPhoto from '../images/paraolimpijczycy.png'
import familyPhoto from '../images/rodzina.png'
import {Box} from '@chakra-ui/react'

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '92vh',
  width: '80vw',
  overflow: 'hidden',
  backgroundSize: 'cover',
  margin: 'auto',
}

const slideImages = [
  {
    url: manPhoto,
  },
  {
    url: womanPhoto,
  },
  {
    url: paraolimpicsPhoto,
  },
  {
    url: familyPhoto,
  },
]

const Slideshow = () => {
  return (
    <Box className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <Box key={index} {...divStyle} backgroundImage={`url(${slideImage.url})`} />
        ))}
      </Slide>
    </Box>
  )
}

export default Slideshow
