import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
        
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}: {email: string, password: string, displayName: string}) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        console.log(resp);

        // TODO: actualizar el displayname en Firebase
        console.log(FirebaseAuth.currentUser);
        
        await updateProfile(FirebaseAuth.currentUser!, {
            displayName, photoURL
        });

        return {
            ok: true,
            uid, 
            photoURL,
            email,
            displayName
        }
        
    } catch (error: any) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorMessage
        }
    }
}

export const loginWithEmailAndPassword = async ({email, password}: {email: string, password: string}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const {photoURL, uid, displayName } = resp.user;
        
        return {
            ok: true,
            uid, 
            photoURL,
            email,
            displayName
        }
        
    } catch (error: any) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}