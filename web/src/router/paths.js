export const HOME_PATH = '/'
export const STATISTICS_PATH = '/statystyki'
export const REGISTRATION_PATH = '/zapisy'
export const CONTACT_PATH = '/kontakt'

export const LIFTER_PATH = '/zawodnik/:zawodnik'
export const LIFTER_CUSTOM_PATH = '/zawodnik/'

export const SEARCH_PATH = '/szukaj/'

export const COMPETITIONS_PATH = '/zawody/'

export const GENDERS_PATH = '/gender/'
export const GENDER_PATH = '/gender/:gender'
export const GENDER_COMPETITION_PATH = '/gender/zawody/:zawody'
export const GENDER_COMPETITION_CUSTOM_PATH = '/gender/zawody/'

export const DISCIPLINES_PATH = '/konkurencja/'
export const DISCIPLINE_COMPETITION_PATH = '/konkurencja/zawody/:zawody'
export const DISCIPLINE_COMPETITION_CUSTOM_PATH = '/konkurencja/zawody/'
export const DISCIPLINE_GENDER_PATH = '/konkurencja/gender/:gender'
export const DISCIPLINE_GENDER_CUSTOM_PATH = '/konkurencja/gender/'
export const DISCIPLINE_COMPETITION_GENDER_PATH = '/konkurencja/zawody/:zawody/gender/:gender'

export const CATEGORIES_PATH = '/kategoria'
export const CATEGORIES_GENDER_PATH = '/kategoria/gender/:gender'
export const CATEGORY_GENDER_DISCIPLINE_PATH = '/kategoria/gender/:gender/konkurencja/:konkurencja'
export const CATEGORIES_GENDER_CUSTOM_PATH = '/kategoria/gender/'
export const CATEGORY_COMPETITION_PATH = '/kategoria/zawody/:zawody'
export const CATEGORY_COMPETITION_DISCIPLINE_PATH = '/kategoria/zawody/:zawody/konkurencja/:konkurencja'
export const CATEGORY_COMPETITION_CUSTOM_PATH = '/kategoria/zawody/'
export const CATEGORY_DISCIPLINE_PATH = '/kategoria/konkurencja/:konkurencja'
export const CATEGORY_DISCIPLINE_CUSTOM_PATH = '/kategoria/konkurencja/'
export const CATEGORY_COMPETITION_GENDER_PATH = '/kategoria/zawody/:zawody/gender/:gender'
export const CATEGORY_COMPETITION_GENDER_DISCIPLINE_PATH =
  '/kategoria/zawody/:zawody/gender/:gender/konkurencja/:konkurencja'

export const RANKING_PATH = '/ranking'
export const RANKING_COMPETITION_PATH = '/ranking/zawody/:zawody'
export const RANKING_COMPETITION_DISCIPLINE_PATH = '/ranking/zawody/:zawody/konkurencja/:konkurencja'
export const RANKING_CATEGORY_PATH = '/ranking/kategoria/:kategoria'
export const RANKING_GENDER_PATH = '/ranking/gender/:gender'
export const RANKING_GENDER_DISCIPLINE_PATH = '/ranking/gender/:gender/konkurencja/:konkurencja'
export const RANKING_DISCIPLINE_PATH = '/ranking/konkurencja/:konkurencja'
export const RANKING_COMPETITION_CATEGORY_PATH = '/ranking/zawody/:zawody/kategoria/:kategoria'
export const RANKING_COMPETITION_GENDER_PATH = '/ranking/zawody/:zawody/gender/:gender'
export const RANKING_COMPETITION_GENDER_DISCIPLINE_PATH =
  '/ranking/zawody/:zawody/gender/:gender/konkurencja/:konkurencja'

export const RANKING_COMPETITION_CUSTOM_PATH = '/ranking/zawody/'
export const RANKING_CATEGORY_CUSTOM_PATH = '/ranking/kategoria/'
export const RANKING_GENDER_CUSTOM_PATH = '/ranking/gender/'
export const RANKING_DISCIPLINE_CUSTOM_PATH = '/ranking/konkurencja/'
