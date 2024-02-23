import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statystyki'
import RankingPage from '../pages/ranking'
import LifterPage from '../pages/zawodnik'
import RegistrationPage from '../pages/zapisy'
import HomePage from '../pages/home'
import AboutUsPage from '../pages/onas'
import ContactPage from '../pages/kontakt'
import Layout from './layouts'

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="zapisy" element={<RegistrationPage />} />
      <Route path="statystyki" element={<StatisticsPage />} />
      <Route path="statystyki/ranking" element={<RankingPage />} />
      <Route path="statystyki/ranking/zawodnik" element={<LifterPage />} />{' '}
      <Route path="onas" element={<AboutUsPage />} />
      <Route path="kontakt" element={<ContactPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
