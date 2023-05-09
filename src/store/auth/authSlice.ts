import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface authState {
    value: {
        status: 'checking' | 'not-authenticated' | 'authenticated'
        uid: string | null,
        email: string | null,
        displayName: string | null,
        photoURL: string | null,
        errorMessage: string | null
    }
}
const initialState: authState = {
    value: {
        status: 'checking', 
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.status = 'authenticated';
            state.value.uid = action.payload.uid;
            state.value.email = action.payload.email;
            state.value.displayName = action.payload.displayName;
            state.value.photoURL = action.payload.photoURL;
            state.value.errorMessage = null;
        },
        logout: (state, {payload}) => {
            state.value.status = 'not-authenticated';
            state.value.uid = null;
            state.value.email = null;
            state.value.displayName = null;
            state.value.photoURL = null;
            state.value.errorMessage = payload.errorMessage;
        },
        checkingCredentials: (state) => {
            state.value.status = 'checking'
        }
    },
})
export const { login, logout, checkingCredentials } = authSlice.actions
export const selectCount = (state: RootState) => state.auth.value;
