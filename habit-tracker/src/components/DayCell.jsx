import { isToday, isFuture } from '../utils/dateUtils.js'

function DayCell({ date, checked, onToggle }) {
    const future = isFuture(date)
    const today = isToday(date)

    const classes = [
      'day-cell',
      checked ? 'checked' : '',
      today ? 'today' : '',
      future ? 'future' : '',
    ].filter(Boolean).join(' ')

    const dateLabel = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    const stateLabel = future ? 'future date' : checked ? 'completed' : 'not completed'
    
  return (
    <button
      type="button"
      className={`day-cell ${checked ? 'checked' : ''} ${isToday(date) ? 'today' : ''} ${future ? 'future' : ''}`}
      onClick={onToggle}
      disabled={future}
      aria-label={`Mark ${date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} -${checked ? 'completed' : 'not completed'}`}
      aria-pressed={checked}
    >
      {checked ? '✓' : ''}
    </button>
  )
}

export default DayCell
