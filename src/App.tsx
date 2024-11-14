import React, { useState } from 'react'

interface StateMachineConfig<StateType, StepNames extends string> {
  initialState: StepNames
  steps: {
    [key in StepNames]: {
      canAdvance: (state: StateType) => boolean
    }
  }
  views: {
    [key in StepNames]: React.ComponentType<{
      state: StateType
      setState: React.Dispatch<React.SetStateAction<StateType>>
    }>
  }
}

type WizardState = {
  name: string
  age: number
}

type StepNames = 'step1' | 'step2' | 'confirmation'

const stateMachineConfig: StateMachineConfig<WizardState, StepNames> = {
  initialStep: 'step 1',
  steps: {
    step1: {
      canAdvance: state => !!state.name
    },
    step2: {
      canAdvance: state => !!state.age
    },
    confirmation: {
      canAdvance: () => true
    }
  },
  views: {
    step1: ({ state, setState }) => {
      <div>
        <input 
          type="text" 
          value={ state.name }
          onChange={ e => setState((prev) => ({ ...prev, name: e.target.value }))}
          placeholder='Full Name'
        />
      </div>
    },
    step2: ({ state, setState }) => {
      <div>
        <input 
          type="number" 
          value={ state.age }
          onChange={ e => setState((prev) => ({ ...prev, age: parseInt(e.target.value) }))}
          placeholder='Age'
        />
      </div>
    },
    confirmation: ({ state }) =>{
      <div>
        <p> { state.name } is { state.age } </p>
      </div>
    } 
  }
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
