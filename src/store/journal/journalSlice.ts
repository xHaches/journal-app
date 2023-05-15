import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface journalState {
    value: {
        isSaving: boolean,
        messageSaved: string,
        notes: {id: string, title: string, body: string, date: Date, imgUrls: string[]}[],
        active?: any
    }
}
const initialState: journalState = {
    value: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        // active: {
        //     id: '123',
        //     title: '',
        //     body: '',
        //     date: 123123,
        //     imgUrls: [],// [https://foto1.jpg, https://foto1.jpg, https://foto1.jpg]
        // }
    },
}
export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.value.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.value.notes.push(action.payload);
            state.value.isSaving = false;
        },
        setActiveNote: (state, action) => {
            // nota que se va a mostrar en pantalla
            state.value.active = action.payload;
            state.value.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.value.notes = action.payload;
        },
        setSaving: (state) => {
            state.value.isSaving = true;
            state.value.messageSaved = '';
        },
        updateNote: (state, action) => {// pauload: note
            state.value.isSaving = false;
            state.value.notes = state.value.notes.map(note => {
                if(note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.value.messageSaved = `La nota: ${action.payload.title} ha sido actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            console.log({action, state: state.value.active});
            
            state.value.active.imgUrls = [
                ...state.value.active.imgUrls, ...action.payload
            ];
            state.value.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.value.isSaving = false;
            state.value.messageSaved = '';
            state.value.notes = [];
            state.value.active = null;
        },
        deleteNoteById: (state, action) => {
            state.value.notes = state.value.notes.filter(note => note.id !== action.payload)
            state.value.active = null;
        },
    },
})
export const {
    addNewEmptyNote,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout
} = journalSlice.actions
export const selectJournal = (state: RootState) => state.journal.value;