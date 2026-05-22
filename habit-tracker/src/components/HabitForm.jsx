import { useState } from 'react'

function HabitForm({ onSubmit }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(name)
    setName('')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <label htmlFor="habit-input" className="visually-hidden">
        New habit
        <input
          id="habit-input"
          type="text"
          value={name}
          placeholder="Add a new habit e.g. Read 30 min"
          onChange={(event) => setName(event.target.value)}
          aria-label="New habit name"
        />
      </label>

      // Disable the button if the input is empty or only whitespace
      <button type="submit" disabled={!name.trim()}>
        Add habit
      </button>
    </form>
  )
}

export default HabitForm
