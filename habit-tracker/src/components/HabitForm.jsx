import { useState } from 'react'

function HabitForm({ onAdd }) {
  const [name, setName] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onAdd(name)
    setName('')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Add a habit e.g. Read 30 min"
          onChange={(event) => setName(event.target.value)}
          aria-label="New habit name"
        />

      {/* Disable the button if the input is empty or only whitespace */}
      <button type="submit" disabled={!name.trim()}>
        Add habit
      </button>
    </form>
  )
}

export default HabitForm
