import { describe, test, expect } from 'vitest';
import{ fileUpload } from '../../src/helpers/fileUpload';

describe('Pruebas en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async () => {
        const imageUrl = "https://res.cloudinary.com/djq3yslgf/image/upload/v1684250364/journal/akfbd52jnqxskyfhbnld.png";
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        
        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
    });
});