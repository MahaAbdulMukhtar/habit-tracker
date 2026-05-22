function WeekNav({ weekDays, weekOffset,  onPrevWeek, onNextWeek, onToday }) {
  const firstDay = weekDays[0]
  const lastDay = weekDays[weekDays.length - 1]

  const firstYear = firstDay.getFullYear()
  const firstMonth = firstDay.getMonth()
  const firstDate = firstDay.getDate()

  const lastYear = lastDay.getFullYear()
  const lastMonth = lastDay.getMonth()
  const lastDate = lastDay.getDate()

  const showYear = firstYear !== lastYear

  const format = (date, includeYear) => {
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: includeYear ? 'numeric' : undefined,
    })
  }
  const rangeLabel = `${format(firstDay, showYear)} - ${format(lastDay, true)}`

  return (
    <section className="week-nav">
      <button type="button" onClick={onPrevWeek}>
        Previous
      </button>

      <div className="week-range">
        <span>{firstDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span>—</span>
        <span>{lastDay.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>

      <button type="button" onClick={onNextWeek}>
        Next
      </button>

      // Disabled when already on the current week
      <button type="button" className="today-btn" onClick={onToday} disabled={weekOffset === 0} aria-label="Go to current week">
        Today
        </button>
    </section>
  )
}

export default WeekNav
