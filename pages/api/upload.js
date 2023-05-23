import multiparty from 'multiparty'
import { resolve } from 'styled-jsx/css';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { readFileSync } from "node:fs"


export default async function handle(req, res) {
    // gets files from the req => use Library multiparty
    const form = new multiparty.Form();
    // dùng promise reject để ẩn lỗi API error
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });

    });


    console.log('length: ', files.file?.[0].path);
    // client
    // const storage = getStorage();
    // Create the file metadata
    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    // TODO: check files.file?.[0].path thành images/mountains.jpg
    console.log(files.file[0]);
    const storageRef = ref(storage, `images/${files.file[0].fieldName}`);
    const uploadTask = uploadBytesResumable(storageRef, readFileSync(files.file[0].path), metadata);

    // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      // User canceled the upload
      break;

    // ...

    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, 
() => {
  // Upload completed successfully, now we can get the download URL
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
  });
}
);

    return res.json('ok')

}

export const config = {
    api: { bodyParser: false }
};
