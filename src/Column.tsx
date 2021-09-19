import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './state/AppStateContext';
import { moveList, addTask, moveTask, setDraggedItem } from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';
import { AddNewItem } from './AddNewItem'
import { Card } from './Card';
import { ColumnContainer, ColumnTitle } from './styles'

type ColumnProps = {
  id: string
  text: string
  isPreview?: boolean
}

export const Column = ({ text, id, isPreview }: ColumnProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { draggedItem, getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)

  const [, drop] = useDrop({
    accept: ['COLUMN', 'CARD'],
    hover() {
      if (!draggedItem) {
        return
      }

      if (draggedItem.type === 'COLUMN') {
        if (draggedItem.id === id) {
          return
        }
        
        dispatch(moveList(draggedItem.id, id))
      } else {
        if (draggedItem.columnId === id || tasks.length) {
          return
        }

        dispatch(
          moveTask(draggedItem.id, null, draggedItem.columnId, id)
        )
        dispatch(setDraggedItem({...draggedItem, columnId: id}))
      }
    }
  })
  const { drag } = useItemDrag({ type: 'COLUMN', id, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'COLUMN', id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map(task => (
        <Card
          key={task.id}
          id={task.id}
          columnId={id}
          text={task.text}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch(addTask(id, text))}
        dark
      />
    </ColumnContainer>
  )
}
