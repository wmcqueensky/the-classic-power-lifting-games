import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statystyki'
import GenderPage from '../pages/plec'
import CategoriesPage from '../pages/kategoria'
import RankingPage from '../pages/ranking'
import LifterPage from '../pages/zawodnik'
import RegistrationPage from '../pages/zapisy'
import HomePage from '../pages/home'
import AboutUsPage from '../pages/onas'
import ContactPage from '../pages/kontakt'
import Layout from './layouts'
import {
  HOME_PATH,
  STATISTICS_PATH,
  REGISTRATION_PATH,
  ABOUT_US_PATH,
  CONTACT_PATH,
  LIFTER_PATH,
  GENDERS_PATH,
  GENDER_COMPETITION_PATH,
  CATEGORY_COMPETITION_GENDER_PATH,
  CATEGORIES_PATH,
  CATEGORIES_GENDER_PATH,
  CATEGORY_COMPETITION_PATH,
  RANKING_PATH,
  RANKING_COMPETITION_PATH,
  RANKING_CATEGORY_PATH,
  RANKING_GENDER_PATH,
  RANKING_COMPETITION_GENDER_PATH,
  RANKING_COMPETITION_CATEGORY_PATH,
} from './paths'

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={STATISTICS_PATH} element={<StatisticsPage />} />
      <Route path={REGISTRATION_PATH} element={<RegistrationPage />} />

      <Route path={GENDERS_PATH} element={<GenderPage />} />
      <Route path={GENDER_COMPETITION_PATH} element={<GenderPage />} />

      <Route path={CATEGORIES_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORIES_GENDER_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_GENDER_PATH} element={<CategoriesPage />} />

      <Route path={RANKING_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_PATH} element={<RankingPage />} />
      <Route path={RANKING_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_GENDER_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_GENDER_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_CATEGORY_PATH} element={<RankingPage />} />

      <Route path={LIFTER_PATH} element={<LifterPage />} />
      <Route path={ABOUT_US_PATH} element={<AboutUsPage />} />
      <Route path={CONTACT_PATH} element={<ContactPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: HOME_PATH}} />} />
  </Routes>
)

export default Router
