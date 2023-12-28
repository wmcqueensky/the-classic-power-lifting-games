import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statystyki'
import RegistrationPage from '../pages/zapisy'
import PhotosPage from '../pages/zdjecia'
import HomePage from '../pages/home'
import AboutUsPage from '../pages/onas'
import Layout from './layouts'

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="zdjecia" element={<PhotosPage />} />
      <Route path="zapisy" element={<RegistrationPage />} />
      <Route path="statystyki" element={<StatisticsPage />} />
      <Route path="onas" element={<AboutUsPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
