import { storage } from './connect';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface UploadFileParams {
  name: string;
  ImageBase64: string;
}

const uploadFile = ({ name, ImageBase64 }: UploadFileParams): Promise<string> => new Promise((resolve, reject) => {
  const base64Image = ImageBase64.split(';base64,').pop();
  if (base64Image == undefined) return reject('image isn\'t base 64');
  const buffer = Buffer.from(base64Image, 'base64');

  const fileRef = ref(storage, `thumbnail/${name}`);

  const uploadTask = uploadBytesResumable(fileRef, buffer);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.info('Upload is ' + progress + '% done');
    }, 

    (error) => {
      reject(error);
    }, 

    async () => {
      const url = await getDownloadURL(fileRef);
      resolve(url);
    },
  );

});

export { uploadFile };