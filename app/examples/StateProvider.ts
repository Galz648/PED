import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the shape of the state
interface State {
  count: number;
}

// Define the initial state
const initialState: State = {
  count: 0,
};

// Define the actions
type Action = { type: 'increment' } | { type: 'decrement' };

// Create a reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create the context
const StateContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Create a provider component
const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

// Create a custom hook to use the state
const useStateContext = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};

export { StateProvider, useStateContext };
