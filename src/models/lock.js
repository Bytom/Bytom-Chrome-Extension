const backgroundPage = chrome.extension.getBackgroundPage()
let lockTime = backgroundPage.getLockTime()

export function updateLockTime () {
  lockTime = Date.now();
  backgroundPage.setLockTime(lockTime)
}
export function isNeedLock () {
  const oneHour = 1000 * 60 * 60
  return !lockTime || Date.now() - lockTime > oneHour
}
