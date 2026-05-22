function WeekNav({ weekDays, weekOffset,  onPrevWeek, onNextWeek, onToday }) {
  const firstDay = weekDays[0]
  const lastDay = weekDays[weekDays.length - 1]

  const crossesYearBoundary = firstDay.getFullYear() !== lastDay.getFullYear()
  const fmt = (date, forceYear = false) => date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: (forceYear || crossesYearBoundary ? { year:'numeric' } : {}),
  })

  return (
    <nav className="week-nav" aria-label="Week navigation">
      <button type="button" className="nav-btn" onClick={onPrevWeek} aria-label="Previous week">
         ←
      </button>

      <span className="week-range">
        <span>{firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span>—</span>
        <span>{lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </span>

      <button type="button" className="nav-btn" onClick={onNextWeek} aria-label="Next week">
        →
      </button>

      {/* Disabled when already on the current week */}
      <button type="button" className="today-btn" onClick={onToday} disabled={weekOffset === 0} aria-label="Go to current week">
        Today
        </button>
    </nav>
  )
}

export default WeekNav
