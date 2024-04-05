import {Navigate, Route, Routes} from 'react-router-dom'
import StatisticsPage from '../pages/statystyki'
import GenderPage from '../pages/plec'
import DisciplinePage from '../pages/konkurencja'
import CategoriesPage from '../pages/kategoria'
import RankingPage from '../pages/ranking'
import LifterPage from '../pages/zawodnik'
import RegistrationPage from '../pages/zapisy'
import HomePage from '../pages/home'
import ContactPage from '../pages/kontakt'
import SearchPage from '../pages/szukaj'
import CompetitionsPage from '../pages/zawody'
import Layout from './layouts'
import {
  HOME_PATH,
  STATISTICS_PATH,
  SEARCH_PATH,
  COMPETITIONS_PATH,
  REGISTRATION_PATH,
  CONTACT_PATH,
  LIFTER_PATH,
  GENDERS_PATH,
  GENDER_COMPETITION_PATH,
  DISCIPLINES_PATH,
  DISCIPLINE_COMPETITION_PATH,
  DISCIPLINE_GENDER_PATH,
  DISCIPLINE_COMPETITION_GENDER_PATH,
  CATEGORY_COMPETITION_GENDER_PATH,
  CATEGORIES_PATH,
  CATEGORIES_GENDER_PATH,
  CATEGORY_GENDER_DISCIPLINE_PATH,
  CATEGORY_COMPETITION_PATH,
  CATEGORY_DISCIPLINE_PATH,
  CATEGORY_COMPETITION_DISCIPLINE_PATH,
  CATEGORY_COMPETITION_GENDER_DISCIPLINE_PATH,
  RANKING_PATH,
  RANKING_COMPETITION_PATH,
  RANKING_CATEGORY_PATH,
  RANKING_GENDER_PATH,
  RANKING_COMPETITION_GENDER_PATH,
  RANKING_COMPETITION_CATEGORY_PATH,
  RANKING_DISCIPLINE_PATH,
  RANKING_COMPETITION_GENDER_DISCIPLINE_PATH,
  RANKING_COMPETITION_DISCIPLINE_PATH,
  RANKING_GENDER_DISCIPLINE_PATH,
  RANKING_COMPETITION_GENDER_DISCIPLINE_CATEGORY_PATH,
  RANKING_COMPETITION_GENDER_CATEGORY_PATH,
  RANKING_DISCIPLINE_CATEGORY_PATH,
  RANKING_GENDER_CATEGORY_PATH,
  RANKING_GENDER_DISCIPLINE_CATEGORY_PATH,
  RANKING_COMPETITION_DISCIPLINE_CATEGORY_PATH,
} from './paths'

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={STATISTICS_PATH} element={<StatisticsPage />} />
      <Route path={REGISTRATION_PATH} element={<RegistrationPage />} />
      <Route path={CONTACT_PATH} element={<ContactPage />} />
      <Route path={SEARCH_PATH} element={<SearchPage />} />{' '}
      <Route path={COMPETITIONS_PATH} element={<CompetitionsPage />} />
      <Route path={GENDERS_PATH} element={<GenderPage />} />
      <Route path={GENDER_COMPETITION_PATH} element={<GenderPage />} />
      <Route path={DISCIPLINES_PATH} element={<DisciplinePage />} />
      <Route path={DISCIPLINE_COMPETITION_PATH} element={<DisciplinePage />} />
      <Route path={DISCIPLINE_GENDER_PATH} element={<DisciplinePage />} />
      <Route path={DISCIPLINE_COMPETITION_GENDER_PATH} element={<DisciplinePage />} />
      <Route path={CATEGORIES_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORIES_GENDER_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_GENDER_DISCIPLINE_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_DISCIPLINE_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_DISCIPLINE_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_GENDER_PATH} element={<CategoriesPage />} />
      <Route path={CATEGORY_COMPETITION_GENDER_DISCIPLINE_PATH} element={<CategoriesPage />} />
      <Route path={RANKING_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_DISCIPLINE_PATH} element={<RankingPage />} />
      <Route path={RANKING_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_GENDER_PATH} element={<RankingPage />} />
      <Route path={RANKING_GENDER_DISCIPLINE_PATH} element={<RankingPage />} />
      <Route path={RANKING_DISCIPLINE_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_GENDER_DISCIPLINE_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_GENDER_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_GENDER_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_DISCIPLINE_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_GENDER_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_GENDER_DISCIPLINE_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_DISCIPLINE_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={RANKING_COMPETITION_GENDER_DISCIPLINE_CATEGORY_PATH} element={<RankingPage />} />
      <Route path={LIFTER_PATH} element={<LifterPage />} />
    </Route>
    <Route path="*" element={<Navigate to={{pathname: HOME_PATH}} />} />
  </Routes>
)

export default Router
