import { useState, useEffect } from 'react'
import { formatDate } from '../utils/dateUtils.js'
import DayCell from './DayCell.jsx'

function HabitRow({ habit, completions, weekDays, onToggleCompletion, onDeleteHabit, onRenameHabit, getStreak }) {
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(habit.name)
  useEffect(() => {
    setEditName(habit.name)
  }, [habit.name])

  const streak = getStreak(habit.id)

  function handleRename(e) {
    e.preventDefault()
    onRenameHabit(habit.id, editName)
    setEditing(false)
  }

  function handleCancelEdit() {
    setEditName(habit.name) 
    setEditing(false)
  }

  return (
    <div className="habit-row">
      <div className="habit-info">
        {editing ? (
          // Inline rename form
          <form className="rename-form" onSubmit={handleRename}>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              autoFocus
              aria-label="Edit habit name"
            />
            <button type="submit" disabled={!editName.trim()}>Save</button>
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          </form>
        ) : (
          <div className="habit-name-row">
            <span className="habit-name">{habit.name}</span>

            {streak > 0 && (
              <span className="streak-badge" aria-label={`${streak} day streak`}>
                🔥 {streak}
              </span>
            )}

            <div className="habit-actions">
              <button
                type="button"
                className="icon-btn"
                onClick={() => setEditing(true)}
                aria-label={`Rename ${habit.name}`}
              >
                ✎
              </button>
              <button
                type="button"
                className="icon-btn delete-btn"
                onClick={() => onDeleteHabit(habit.id)}
                aria-label={`Delete ${habit.name}`}
              >
                x
              </button>
            </div>
          </div>
        )}
      </div>

      {weekDays.map((day) => {
        const key = `${habit.id}::${formatDate(day)}`
        return (
          <DayCell
            key={key}
            date={day}
            checked={Boolean(completions[key])}
            onToggle={() => onToggleCompletion(habit.id, day)}
          />
        )
      })}
    </div>
  )
}

export default HabitRow