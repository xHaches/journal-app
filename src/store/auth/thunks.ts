import { async } from "@firebase/util";
import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email: string, password: string): any => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
    }
};

export const startGoogleSingIn = (): any => {
    return async(dispatch: any) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if(!result.ok) {
            return dispatch(logout(result.errorMessage));
        }
        dispatch(login(result));
    }
};

export const startCreatingUserWithEmailPassword = ({email, password, displayName}: {email: string, password: string, displayName: string}): any => {
    return async(dispatch: any) => {
        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
            email, password, displayName
        });

        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({ uid, displayName, email, photoURL }));
    }
};


export const startLoginWithEmailPassword = ({email, password}: {email: string, password: string}): any => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials());
        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailAndPassword({email, password});
        if(!ok) return dispatch(logout({errorMessage}));
        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLogout = (): any => {
    return async (dispatch: any) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout({errorMessage: null}));
    }
}