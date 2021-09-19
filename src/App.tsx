import { useAppState } from './state/AppStateContext';
import { addList } from './state/actions';
import { Column } from './Column';
import { AddNewItem } from './AddNewItem';
import { CustomDragLayer } from './CustomDragLayer';
import { AppContainer } from './styles';

export const App = () => {
  const { lists, dispatch } = useAppState()
  
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(list => (
        <Column
          key={list.id}
          id={list.id}
          text={list.text}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch(addList(text))}
      />
    </AppContainer>
  );
}
