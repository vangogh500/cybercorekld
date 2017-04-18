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

const tournament = new schema.Entity('tournaments')

export function normalizeTournaments(tournamentsData) {
  return normalize(tournamentsData, {
    tournamentList: [tournament]
  })
}

export function normalizeUsers(usersData) {
  return normalize(usersData, {
    users: [user]
  })
}
