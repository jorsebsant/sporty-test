export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}

export interface LeaguesResponse {
  leagues: League[]
}

export interface SeasonBadge {
  idLeague: string
  strSeason: string
  strBadge: string | null
}

export interface SeasonBadgesResponse {
  seasons: SeasonBadge[] | null
}
