import { DragItem } from '../DragItem';

export type Action =
  | {
      type: 'ADD_LIST'
      payload: string
    }
  | {
      type: 'ADD_TASK'
      payload: { listId: string, text: string }
    }
  | {
      type: 'MOVE_LIST'
      payload: {
        draggedId: string
        hoverId: string
      }
    }
  | {
      type: 'MOVE_TASK'
      payload: {
        draggedItemId: string
        hoveredItemId: string | null
        sourceColumnId: string
        targetColumnId: string
      }
    }
  | {
      type: 'SET_DRAGGED_ITEM'
      payload: DragItem | null
    }

export const addList = (text: string): Action => ({
  type: 'ADD_LIST',
  payload: text
})

export const addTask = (listId: string, text: string): Action => ({
  type: 'ADD_TASK',
  payload: {
    listId,
    text
  }
})

export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: 'MOVE_LIST',
  payload: {
    draggedId,
    hoverId
  }
})

export const moveTask = (draggedItemId: string, hoveredItemId: string | null, sourceColumnId: string, targetColumnId: string): Action => ({
  type: 'MOVE_TASK',
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId
  }
})

export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: 'SET_DRAGGED_ITEM',
  payload: draggedItem
})
