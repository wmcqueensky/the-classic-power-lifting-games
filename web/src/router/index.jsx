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
import * as paths from './paths'

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={paths.REGISTRATION_PATH} element={<RegistrationPage />} />
      <Route path={paths.STATISTICS_PATH} element={<StatisticsPage />} />
      <Route path={paths.CATEGORIES_PATH} element={<CategoriesPage />} />
      <Route path={paths.CATEGORY_COMPETITION_PATH} element={<CategoriesPage />} />
      <Route path={paths.RANKING_PATH} element={<RankingPage />} />
      <Route path={paths.RANKING_COMPETITION_PATH} element={<RankingPage />} />
      <Route path={paths.RANKING_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={paths.RANKING_COMPETITION_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={paths.LIFTER_PATH} element={<LifterPage />} />
      <Route path={paths.ABOUT_US_PATH} element={<AboutUsPage />} />
      <Route path={paths.CONTACT_PATH} element={<ContactPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: paths.HOME_PATH}} />} />
  </Routes>
)

export default Router
