import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppState } from './state/AppStateContext';
import { moveTask, setDraggedItem } from './state/actions';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';
import { CardContainer } from "./styles";

type CardProps = {
  id: string
  columnId: string
  text: string
  isPreview?: boolean
}

export const Card = ({ id, columnId, text, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const { drag } = useItemDrag({
    type: 'CARD',
    id,
    text,
    columnId
  })

  const [, drop] = useDrop({
    accept: 'CARD',
    hover() {
      if (!draggedItem) {
        return
      }
      if (draggedItem.type !== 'CARD') {
        return
      }
      if (draggedItem.id === id) {
        return
      }

      dispatch(
        moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
      )
      dispatch(setDraggedItem({ ...draggedItem, columnId }))
    }
  })

  drag(drop(ref))

  return (
    <CardContainer
      ref={ref}
      isPreview={isPreview}
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
    >
      {text}
    </CardContainer>
  )
}
