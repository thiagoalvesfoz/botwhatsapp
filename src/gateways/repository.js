import storage from '../db/database.json' assert { type: 'json' }

export function getGroupByFrom(groupInfo) {
  return storage.find((group) => group?.id === groupInfo.id)
}

export function hasStage({ from }) {
  return !!storage[from] && storage[from].stage === 1
}
