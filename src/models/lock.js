const STORGE_KEY = 'LOCK_TIME'
let lockTime = localStorage.getItem(STORGE_KEY)

export function updateLockTime () {
  lockTime = Date.now()
  localStorage.setItem('LOCK_TIME', lockTime)
}
export function isNeedLock () {
  const oneHour = 1000 * 60 * 60
  return !lockTime || Date.now() - lockTime > oneHour
}
