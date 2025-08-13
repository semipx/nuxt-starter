export default function useUserEnv() {
  const timeZone = ref('')
  const utcOffset = ref('')
  if (import.meta.client) {
    timeZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timeZoneOffset = 0 - new Date().getTimezoneOffset() / 60
    utcOffset.value = `UTC${timeZoneOffset < 0 ? timeZoneOffset : `+${timeZoneOffset}`}`
  }
  const { isMobile, isWindows, isMacOS, isAndroid, isIos, isCrawler } = useDevice()
  return { timeZone, utcOffset, isMobile, isWindows, isMacOS, isAndroid, isIos, isCrawler }
}
