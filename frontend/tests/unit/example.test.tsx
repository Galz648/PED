import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom'
import React from 'react'

// Example component to test
function Counter() {
  const [count, setCount] = React.useState(0)
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

describe('Example Component Tests', () => {
  it('renders with initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('increments count when button is clicked', async () => {
    render(<Counter />)
    const user = userEvent.setup()

    await user.click(screen.getByText('Increment'))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  // Example of testing DOM elements
  it('demonstrates basic DOM assertions', () => {
    render(
      <div>
        <h1>Hello Vitest</h1>
        <button disabled>Click me</button>
      </div>
    )

    const heading = screen.getByText('Hello Vitest')
    const button = screen.getByText('Click me')

    // Using Vitest's built-in DOM matchers
    expect(heading).toBeDefined()
    expect(button).toBeDefined()
    expect(button).toHaveProperty('disabled', true)
  })
})
