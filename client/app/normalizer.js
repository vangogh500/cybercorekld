import {normalize, schema } from 'normalizr'

const user = new schema.Entity('users')

const ladderEntries = new schema.Entity('ladderEntries', {
  _user: user
})

export function normalizeLadderEntries(ladderData) {
  return normalize(ladderData, {
    ladder: [ladderEntries]
  })
}
