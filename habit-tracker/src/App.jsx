import './App.css'
import useHabits from './hooks/useHabits.js'
import WeekNav from './components/WeekNav.jsx'
import HabitForm from './components/HabitForm.jsx'
import HabitGrid from './components/HabitGrid.jsx'
import EmptyState from './components/EmptyState.jsx'
import { getWeekDays } from './utils/dateUtils.js'

function App() {
  // All state and ac
  const {
    habits,
    completions,
    weekOffset,
    addHabit,
    renameHabit,
    toggleCompletion,
    getStreak,
    deleteHabit,
    goToPrevWeek,
    goToNextWeek,
    goToCurrentWeek,
  } = useHabits()
  const weekDays = getWeekDays(weekOffset)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Habit Tracker</h1>
      </header>

    <main className="app-main">
        <HabitForm onSubmit={addHabit} />

        <WeekNav
          weekOffset={weekOffset}
          weekDays={weekDays}
          onPrevWeek={goToPrevWeek}
          onNextWeek={goToNextWeek}
          onToday={goToCurrentWeek}
        />

        {habits.length === 0 ? (
          <EmptyState />
        ) : (
          <HabitGrid
            habits={habits}
            completions={completions}
            weekDays={weekDays}
            weekOffset={weekOffset}
            onToggleCompletion={toggleCompletion}
            onDeleteHabit={deleteHabit}
            onRenameHabit={renameHabit}
            getStreak={getStreak}
          />
        )}
      </main>
     </div>
  )
}

export default App
