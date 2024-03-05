import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statystyki'
import CategoriesPage from '../pages/kategoria'
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
      <Route path="kategoria" element={<CategoriesPage />} />
      <Route path="kategoria/zawody/:zawody" element={<CategoriesPage />} />
      <Route path="ranking" element={<RankingPage />} />
      <Route path="ranking/zawody/:zawody" element={<RankingPage />} />
      <Route path="ranking/kategoria/:kategoria" element={<RankingPage />} />
      <Route path="ranking/zawody/:zawody/kategoria/:kategoria" element={<RankingPage />} />
      <Route path="zawodnik/:zawodnik" element={<LifterPage />} />
      <Route path="onas" element={<AboutUsPage />} />
      <Route path="kontakt" element={<ContactPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
