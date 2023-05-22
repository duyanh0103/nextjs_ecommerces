// import Layout from "../../components/layout";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
}) {
    // state for all the input elements
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [goToProducts, setGoToProducts] = useState(false);
    // router
    const router = useRouter();
    // clg id
    // console.log(_id);
    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price };
        // check _id existed or not 
        if (_id) {
            //update
            await axios.put('/api/products', { ...data, _id });  // send request
        } else {
            //create a new product
            // send request to our api (use either fetch or axios...)

            await axios.post('/api/products', data);

        }
        // after created product => redirect back to the products page
        setGoToProducts(true);

    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImgs(e){
        // console.log(e.target?.files);
        const files = e.target.files;
        if (files?.length > 0) {
            // send those files as formData instead of jsons
            const data = new FormData();
            for(const file of files) {
                // files.forEach(file => data.append('file',file));
                data.append('file',file)
            }          
            // const res = await axios.post('/api/upload', data, {
            //     headers: { 'Content-Type': 'multiparty/form-data' },
            // });
            const res = await fetch('/api/upload',  {
                method: 'POST',
                body:data,
            });
            console.log(res);
        }
    }
    return (
        <form onSubmit={saveProduct}>
            <label className={styles.new_prod_title}>Product name:</label>
            <input
                type="text"
                placeholder="Product name"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <label>
                Photo
            </label>
            <div className="mb-2">
                <label className={styles.btn_upload}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" className="hidden" onChange={uploadImgs}/>
                </label>

                {/* display all the photo here */}
                {!images?.length && (
                    <div>
                        No photos available in this product!!
                    </div>
                )}
            </div>
            <label className={styles.new_prod_title}>Description:</label>
            <textarea
                type="text"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <label className={styles.new_prod_title}>Price: </label>
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <button
                type="submit"
                className="btn-primary">Save</button>
        </form>
    );
} 