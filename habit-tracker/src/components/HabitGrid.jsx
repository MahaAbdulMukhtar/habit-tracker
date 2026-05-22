import { formatDate, getDayLabel, isToday } from '../utils/dateUtils.js'
import HabitRow from './HabitRow.jsx'

function HabitGrid({ habits, completions, weekDays, onToggleCompletion, onDeleteHabit, onRenameHabit, getStreak }) {
  return (
    <section className="habit-grid" aria-label="Habit tracker grid">
      <div className="grid-header">
        <div className="habit-col-header">Habit</div>
        {weekDays.map((day) => (
          <div
            key={formatDate(day)}
            className={`day-header ${isToday(day) ? 'today' : ''}`}
            aria-label={day.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          >
            <span className="day-label">{getDayLabel(day)}</span>
            <span className="day-number">{day.getDate()}</span>
          </div>
        ))}
      </div>
      <div className="habit-list">
        {habits.map((habit) => (
          <HabitRow
            key={habit.id}
            habit={habit}
            completions={completions}
            weekDays={weekDays}
            onToggleCompletion={onToggleCompletion}
            onDeleteHabit={onDeleteHabit}
            onRenameHabit={onRenameHabit}
            getStreak={getStreak}
          />
        ))}
      </div>
    </section>
  )
}

export default HabitGrid