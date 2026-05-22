// Returns an array of Date objects for the given week (Mon to Sun)
// weekOffset: 0 = current week, -1 = last week, +1 = next week
function getWeekDays(weekOffset = 0) {
  const today = new Date()

  // getDay() + 6 % 7 maps Sun=0, Mon=1, ... to Mon=0, Sun=6
  const mondayOffset = (today.getDay() + 6) % 7

  const firstDayOfWeek = new Date(today)
  firstDayOfWeek.setDate(today.getDate() - mondayOffset + weekOffset * 7)

  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(firstDayOfWeek)
    day.setDate(firstDayOfWeek.getDate() + i)
    weekDays.push(day)
  }

  return weekDays
}

// Format a date as YYYY-MM-DD using local time (not UTC)
function formatDate(date) {
  const parsedDate = date instanceof Date ? date : new Date(date)
  const year = parsedDate.getFullYear()
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0')
  const day = String(parsedDate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Returns true if the given date is today
function isToday(date) {
  return formatDate(date) === formatDate(new Date())
}

// Returns true if the given date is in the future
function isFuture(date) {
  return formatDate(date) > formatDate(new Date())
}

// Returns a short weekday label (e.g. "Mon") for a given date
function getDayLabel(date) {
  const parsedDate = date instanceof Date ? date : new Date(date)
  return parsedDate.toLocaleDateString('en-US', { weekday: 'short' })
}

export { getWeekDays, formatDate, isToday, isFuture, getDayLabel }
