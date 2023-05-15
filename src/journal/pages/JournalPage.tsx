import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal';
import { RootState } from '../../store';

export const JournalPage = () => {

  const dispatch = useDispatch();

  const { value: { isSaving, active } } = useSelector((state: RootState) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      <>
        {
          (!!active) ? <NoteView /> : <NothingSelectedView /> 
        }
        <IconButton
          onClick={onClickNewNote}
          size="large"
          disabled={isSaving}
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': {backgroundColor: 'error.main', opacity: 0.9},
            position: 'fixed',
            right: 50,
            bottom: 50
          }}
        >
          <AddOutlined sx={{fontSize: 30}} />
        </IconButton>
      </>
    </JournalLayout>
  )
}
