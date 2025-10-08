export function formatDateURI(dateObj) {
  const dayRaw = dateObj.getDate()
  const hoursRaw = dateObj.getHours()
  const minutesRaw = dateObj.getMinutes()
  const monthRaw = dateObj.getMonth() + 1
  const secondsRaw = dateObj.getSeconds()
  const day = dayRaw.toString().padStart(2, '0')
  const hours = hoursRaw.toString().padStart(2, '0')
  const minutes = minutesRaw.toString().padStart(2, '0')
  const month = monthRaw.toString().padStart(2, '0')
  const seconds = secondsRaw.toString().padStart(2, '0')
  const year = dateObj.getFullYear()

  return `${year}${month}${day}${hours}${minutes}${seconds}`
}

export function stripSpecialChars(dateStr) {
  const [date, time] = dateStr.split(' ')
  const dateParts = date.split('-')
  const timeParts = time.split(':')
  const dateNumbers = dateParts.join('')
  const timeNumbers = timeParts.join('')
  return `${dateNumbers}${timeNumbers}`
}
