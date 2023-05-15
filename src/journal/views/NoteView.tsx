import { Grid, Typography, Button, TextField, IconButton } from '@mui/material'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {

    const { value: { active:note, messageSaved, isSaving } } = useSelector((state: RootState) => state.journal);

    const dispatch = useDispatch()

    const { body, title, date, onInputChange, formState } = useForm<{body: string, title: string, date: Date}>(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(!messageSaved.length) {
            return;
        }
        Swal.fire('Nota actualizada', messageSaved, 'success');
    }, [messageSaved]);

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = (event:  ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.files?.length === 0) {
            return;
        }
        dispatch(startUploadingFiles(event.currentTarget.files!));
    }

    const fileInputRef = useRef(null);

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid 
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center" 
            sx={{mb: 1}}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input 
                    type="file" 
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => (fileInputRef?.current as any).click()}
                >
                    <UploadOutlined />
                </IconButton>
                <Button 
                    onClick={onSaveNote}
                    color="primary"
                    sx={{padding: 2}}
                    disabled={isSaving}
                >
                    <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{border: 'none', mb: 1}}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>
            <Grid container justifyContent="end">
                <Button
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>
            {/* Image gallery */}
            <ImageGallery
                images={note.imgUrls}
            />
        </Grid>
    )
}
