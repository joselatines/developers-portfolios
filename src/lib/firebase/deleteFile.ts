import { storage } from './connect';
import { ref, deleteObject } from 'firebase/storage';

const deleteFile = (name: string): Promise<boolean> => new Promise((resolve, reject) => {
  const img = ref(storage, `thumbnail/${name}`);

  deleteObject(img)
    .then(() => {
      resolve(true);
    }).catch((error) => {
      reject(error);
    });
});

export { deleteFile };