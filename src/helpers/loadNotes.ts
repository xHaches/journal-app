import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

interface Note {
    date: Date, id: string, title: string, body: string
}

export const loadNotes = async (uid = '') => {
    if(!uid) throw new Error('El UID del usuario no existe');
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes: Note[] = [];
    docs.forEach(doc => {
        notes.push({...(doc.data() as Note), id: doc.id})
    });
    
    return notes;
}
