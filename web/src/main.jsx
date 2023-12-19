import React from 'react'
import {ChakraProvider} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
// import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </BrowserRouter>{' '}
  </React.StrictMode>
)
