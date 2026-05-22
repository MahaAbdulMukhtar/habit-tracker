import { useEffect, useState } from 'react'
import { formatDate } from '../utils/dateUtils.js'

// Separate keys for habits and completions in localStorage
const HABITS_STORAGE_KEY = 'habit-tracker-habits'
const COMPLETIONS_STORAGE_KEY = 'habit-tracker-completions'

// Load habits from localStorage, or return an empty array if not found or on error
function loadHabits() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = window.localStorage.getItem(HABITS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

// Load completions from localStorage, or return an empty object if not found or on error
function loadCompletions() {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const saved = window.localStorage.getItem(COMPLETIONS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : {}
  } catch {
    return {}
  }
}

function useHabits() {
    // habits: [{ id, name, createdAt }]
  const [habits, setHabits] = useState(loadHabits)

  // completions: { "habitId::YYYY-MM-DD": true }
  const [completions, setCompletions] = useState(loadCompletions)
  const [weekOffset, setWeekOffset] = useState(0)

  // Save habits to localStorage
  useEffect(() => {
    window.localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  // Save completions to localStorage
  useEffect(() => {
    window.localStorage.setItem(COMPLETIONS_STORAGE_KEY, JSON.stringify(completions))
  }, [completions])

  // Add a new habit to the list
  function addHabit(name) {
    const trimmed = name.trim()
    if (!trimmed) {
      return
    }

    setHabits((current) => [
      {
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
        name: trimmed,
        createdAt: formatDate(new Date()),
      },
      ...current,
    ])
  }

  // Delete a habit and all its completions
  function deleteHabit(id) {
    setHabits((current) => current.filter((habit) => habit.id !== id))
    
    setCompletions((current) => {
      const updated = { ...current }
      Object.keys(updated).forEach((key) => {
        if (key.startsWith(`${id}::`)) {
          delete updated[key]
        }
      })
      return updated
    })
  }

  // Update the name of an existing habit
  function renameHabit(id, newName) {
    const trimmed = newName.trim()
    if (!trimmed) {
      return
    }

    setHabits((current) =>
      current.map((habit) => (habit.id === id ? { ...habit, name: trimmed } : habit)),
    )
  }

  // Toggle completion status for a habit on a specific date
  function toggleCompletion(habitId, date) {
    const key = `${habitId}::${formatDate(date)}`
    setCompletions((current) => {
      const updated = { ...current }
      if (updated[key]) {
        delete updated[key]
      } else {
        updated[key] = true
      }
      return updated
    })
  }

  // Calculate the current streak of consecutive completed days for a habit
  function getStreak(habitId) {
    let streak = 0
    let currentDate = new Date()

    // Start from yesterday if today is not completed
    const todayKey = `${habitId}::${formatDate(new Date())}`
    if (!completions[todayKey]) {
      currentDate.setDate(currentDate.getDate() - 1)
    }

    // Walk backwards until a day is not completed
    while (true) {
      const dateKey = `${habitId}::${formatDate(currentDate)}`
      if (!completions[dateKey]) {
        break
      }
      streak += 1
      currentDate.setDate(currentDate.getDate() - 1)
    }

    return streak
  }

  function goToPrevWeek() {
    setWeekOffset((w) => w - 1)
  }

  function goToNextWeek() {
    setWeekOffset((w) => w + 1)
  }

  function goToCurrentWeek() {
    setWeekOffset(0)
  }

  return {
    habits,
    completions,
    weekOffset,
    addHabit,
    deleteHabit,
    renameHabit,
    toggleCompletion,
    getStreak,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
  }
}

export default useHabits
