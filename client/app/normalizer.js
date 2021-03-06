import {normalize, schema } from 'normalizr'

const user = new schema.Entity('users')
const match = new schema.Entity('matches')

const ladderEntries = new schema.Entity('ladderEntries', {
  _user: user,
  matches: [match]
})

export function normalizeLadderEntries(ladderData) {
  return normalize(ladderData, {
    ladder: [ladderEntries]
  })
}

const team = new schema.Entity('teams')
const tournamentMatch = new schema.Entity('tournamentMatches')

const tournament = new schema.Entity('tournaments', {
  matches: [tournamentMatch]
})

export function normalizeTournaments(tournamentsData) {
  return normalize(tournamentsData, {
    tournamentList: [tournament]
  })
}

export function normalizeTeams(teamsData) {
  return normalize(teamsData, {
    teams: [team]
  })
}

export function normalizeUsers(usersData) {
  return normalize(usersData, {
    users: [user]
  })
}


export function normalizeTournamentMatches(tournamentMatchesData) {
  return normalize(tournamentMatchesData, {
    matches: [tournamentMatch]
  })
}
