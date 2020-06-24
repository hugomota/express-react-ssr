import { DateTime } from 'luxon'

export const normalizeDateTime = (dateTime: string) => {
  const dt = DateTime.fromISO(dateTime)

  return dt.toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}