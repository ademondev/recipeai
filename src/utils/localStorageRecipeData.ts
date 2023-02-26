import { Image } from 'google-images';

const STORAGE_KEY = 'savedRecipes';

const loadImageStorage = (storageKey: string, firstImage: Image): Image[] => {
    const loadedStorage = localStorage.getItem(storageKey);
    if (loadedStorage === null || loadedStorage === undefined || loadedStorage.length === 0) {
        return [
            firstImage
        ]
    }
    const parsedLoadedStorage = JSON.parse(loadedStorage) as Image[];
    return parsedLoadedStorage;
}

const saveImageStorage = (storageKey: string, dataToSave: Image[]) => {
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
}

export { loadImageStorage, saveImageStorage }; 
export { STORAGE_KEY };