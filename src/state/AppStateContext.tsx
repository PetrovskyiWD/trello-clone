import { createContext, useContext, useEffect, Dispatch, ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import { Task, List, AppState, appStateReducer } from './appStateReducer';
import { withInitialState } from '../withInitialState';
import { Action } from './actions';
import { save } from '../api';
import { DragItem } from '../DragItem';

type AppStateContextProps = {
  lists: List[]
  draggedItem: DragItem | null
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

type AppStateProviderProps = {
  children: ReactNode
  initialState: AppState
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState)
    const { lists, draggedItem } = state

    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || []
    }

    useEffect(() => {
      save(state)
    }, [state])

    return (
      <AppStateContext.Provider
        value={{ lists, draggedItem, getTasksByListId, dispatch }}>
        {children}
      </AppStateContext.Provider>
    )
  }
)

export const useAppState = () => {
  return useContext(AppStateContext)
}
