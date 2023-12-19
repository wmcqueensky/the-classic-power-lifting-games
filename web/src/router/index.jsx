import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statistics'
import RegistrationPage from '../pages/registration'
import PhotosPage from '../pages/photos'
import HomePage from '../pages/home'

const Router = () => (
  <Routes>
    <Route index element={<HomePage />} />
    <Route path="photos" element={<PhotosPage />} />
    <Route path="registration" element={<RegistrationPage />} />
    <Route path="statistics" element={<StatisticsPage />} />

    {/* <Route path="*" element={<Navigate to={{pathname: '/'}} />} /> */}
  </Routes>
)

export default Router
