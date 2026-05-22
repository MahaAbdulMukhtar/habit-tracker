# How to run

**Live demo:** https://MahaAbdulMukhtar.github.io/habit-tracker/

**To run locally:**

1. Install Node.js 18+.
2. From the project root:

```bash
npm install
npm run dev
```

3. Open the local Vite URL printed in the terminal (usually `http://localhost:5173`).

# Stack & design choices

**Stack**
- React + Vite for a fast, component-based frontend.
- Plain CSS with CSS variables for responsive theming.
- No UI framework, so the app stays lightweight and easy to customize.

**Why this stack**
- React is a good fit because the app is naturally organized into reusable UI pieces: the habit form, weekly nav, row, and day cells.
- Vite gives immediate feedback during development and a fast production build without extra configuration.

**Decision 1 — Weekly grid over a list**
- The main tracker is implemented in `src/components/HabitGrid.jsx` and `src/components/HabitRow.jsx`.
- I chose a grid layout rather than a simple habit list because the core interaction is time-based: habits intersect with specific days.
- A row-plus-column grid makes it obvious how daily completion relates to each habit and lets the user compare progress across the full week.

**Decision 2 — Hide action controls until interaction intent**
- In `src/components/HabitRow.jsx` and `src/App.css`, habit action buttons are initially invisible and only fade in on row hover.
- This keeps the row visually quiet while preserving the primary daily toggle interaction, so the UI doesn’t feel cluttered when many habits are present.

## Week start & streak counting choices

**Week start: Monday**
- Implemented in `src/utils/dateUtils.js` via the `(today.getDay() + 6) % 7` remapping so the week runs Monday → Sunday.
- Reason: Monday-first weeks follow ISO conventions and map well to how many people plan weekly routines (weekdays grouped together). Using Monday simplifies mental models for weekly goals and aligns the UI with common international expectations.

**Streak counting: counts up to today if today is completed, otherwise up to yesterday**
- Implemented in `src/hooks/useHabits.js` in `getStreak()`: the function checks whether today's completion exists and, if not, starts counting from yesterday.
- Reason: counting to today when the user has already completed today's action gives immediate positive feedback and reflects the "current" streak. If today is not yet completed, counting to yesterday avoids overstating the streak and gives the user a clear target for continuing it. This balances encouragement (showing progress when completed) with leniency for users who haven't yet logged today's habit.

If you'd prefer a different policy (for example, always count only up to yesterday), it's a one-line change in `getStreak()` to always start from yesterday.

# Responsive & accessibility

**360px phone behavior**
- `src/App.css` reduces `--cell-size` to `38px` in the mobile media query.
- The habit form stacks vertically, and the submit button becomes full width.
- `.habit-actions` opacity is forced to `1` on small screens so touch users can always see rename/delete controls.

**1440px laptop behavior**
- The layout centers in a `max-width: 980px` container with more padding.
- Hover states and row interactions are visible, and the grid remains wide enough for day cells to read comfortably.

**Accessibility consideration handled**
- `DayCell` uses `aria-pressed`, `aria-label`, and `disabled` for future dates, making toggle buttons accessible to screen readers and keyboard users.
- Focus styling is supported through `.day-cell:focus-visible` in `src/App.css`.
- The habit input has `aria-label="New habit name"` and the rename form input has `aria-label="Edit habit name"`.

**Accessibility knowingly skipped**
- I did not implement a permanent undo or confirmation dialog for delete actions.
- This keeps the interaction lightweight, but the result is a higher risk of accidental deletion for keyboard/screen reader users.

# AI usage

- I used AI to help refine how the hook state and date utilities should work.
- Example: I asked for guidance on the Monday-first week calculation in `src/utils/dateUtils.js`.
  - The AI suggested remapping `getDay()` with `(today.getDay() + 6) % 7`.
  - I kept that but verified the boundary logic for Sunday and Monday myself.
- Example: I asked for a `useHabits` hook pattern.
  - The AI initially returned a habit object with completion values embedded inside each habit.
  - I changed that to a flat `completions` map keyed by `habitId::YYYY-MM-DD` because it makes deletion easier and avoids nested updates.
- Example: I asked for CSS token structure.
  - The AI suggested using CSS variables and semantic color names.
  - I then customized the palette to the current dark theme and teal accent, rather than using the default colors it gave.

# Honest gap

One thing that isn't fully polished: streak calculation does not consider the habit creation date.
- `src/hooks/useHabits.js` computes streaks by walking backward from today or yesterday until a day is incomplete.
- If the habit was created today, the current logic could still count an earlier streak if stale completion keys exist.
- With another day, I would lock streak calculation to `habit.createdAt` and stop the streak at the creation boundary.
