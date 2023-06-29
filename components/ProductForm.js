// import Layout from "../../components/layout";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";
import { useEffect, useState } from "react";
export default function ProductForm({
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images: existingImages,
    category: assignedCategory,
    properties: assignedProperties,
}) {
    // state for all the input elements
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [category, setCategory] = useState(assignedCategory || '');
    const [productProperties, setProductProperties] = useState(assignedProperties || {});
    const [isUploading, setIsUploading] = useState(false);
    const [goToProducts, setGoToProducts] = useState(false);
    const [categories, setCategories] = useState([]);

    // categories
    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);
    // router
    const router = useRouter();
    // clg id
    // console.log(_id);
    async function saveProduct(e) {
        e.preventDefault();
        const data = { title, description, price, images, category, properties: productProperties };
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
    async function uploadImgs(e) {
        const files = e.target.files;
        if (files?.length > 0) {
            setIsUploading(true);
            // send those files as formData instead of jsons
            const data = new FormData();
            for (const file of files) {
                data.append('file', file)
            }
            // const res = await axios.post('/api/upload', data, {
            //     headers: { 'Content-Type': 'multiparty/form-data' },
            // });
            const res = await axios.post('/api/upload', data);
            // const res = await fetch('/api/upload',  {
            //     method: 'POST',
            //     body:data,
            // });
            // console.log(res.data.links);
            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }
    function updateImagesOrder(images) {
        setImages(images);
    }

    // thay đổi được các prop của sản phẩm trong ProductForm
    function setProductProp(propName,value) {
        setProductProperties(prev => {
          const newProductProps = {...prev};
          newProductProps[propName] = value;
          return newProductProps;
        });
      }

    // lấy properties từ prop child và prop parent (vidu lấy prop iphone cần đi kèm theo prop mobile)
    const propertiesToFill = [];
    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        //    console.log({selCatInfo});
        propertiesToFill.push(...catInfo.properties);
        //check xem cái category này có parent hay không?
        //nếu có thì tìm thông tin về parent đó và push properties đó vào array
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
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
            <label>Category</label>
            <select
                value={category}
                onChange={ev => setCategory(ev.target.value)}>

                <option value="">Không phân loại</option>
                {categories.length > 0 && categories.map(c => (
                    <option value={c._id}>{c.name}</option>
                ))}
            </select>
            {/* hiển thị category */}
            {propertiesToFill.length > 0 && propertiesToFill.map(p => (
                <div className="flex gap-1">
                    <div>{p.name}</div>
                    <select value={productProperties[p.name]}
                        onChange={(e) => setProductProp(p.name, e.target.value)} >
                        {p.values.map(v => (
                            <option value={v}>{v}</option>
                        ))}
                    </select>
                </div>

            ))}
            <label>
                Photo
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
                <ReactSortable
                    list={images}
                    className="flex flex-wrap gap-1"
                    setList={updateImagesOrder}>
                    {/* display all the photo here */}
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24">
                            <img src={link} alt="img error" className="rounded-lg" />
                        </div>
                    ))}
                </ReactSortable>

                {isUploading && (
                    <div className="h-24 flex items-center p-3">
                        <Spinner />
                    </div>
                )}

                <label className={styles.btn_upload}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <div>
                        Upload
                    </div>
                    <input type="file" className="hidden" onChange={uploadImgs} />
                </label>

            </div>
            {!images?.length && (
                <div>
                    No photos available in this product!!
                </div>
            )}
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