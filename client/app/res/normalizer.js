import {normalize, schema } from 'normalizr'

const user = new schema.Entity('users')

/**
 * Normalizes a list of users
 * @param {Object} usersData (list stored in 'users' property)
 * @return {Object} normalization
 */
export function normalizeUsers(usersData) {
  return normalize(usersData, {
    users: [user]
  })
}

const tournament = new schema.Entity('tournaments')

export function normalizeTournaments(tournamentsData) {
  return normalize(tournamentsData, {
    tournaments: [tournament]
  })
}
