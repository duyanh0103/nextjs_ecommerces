import multiparty from 'multiparty'
import { resolve } from 'styled-jsx/css';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "../../firebaseConfig";



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
        contentType: 'image/jpg'
    };
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, 'images/' + files.file?.[0].path);
    const uploadTask = uploadBytesResumable(storageRef, files.file?.[0], metadata);
    return res.json('ok')

}

export const config = {
    api: { bodyParser: false }
};
