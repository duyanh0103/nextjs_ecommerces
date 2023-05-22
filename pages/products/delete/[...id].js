import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
export default function deleteProductPage() {
    const router = useRouter();
    const [productInfor, setProductInfor] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        // get data of the product
        axios.get('/api/products/?id=' + id).then(response => {
            setProductInfor(response.data);
        });
    }, [id]);
    function goBack() {
        router.push('/products');
    }
    async function deleteProduct() {
        await axios.delete('/api/products?id='+ id);
        goBack();
    }
    return (
        <Layout>
            <h1 className="text-center">
                Delete this product 
                &nbsp;&quot;{productInfor?.title}&quot; ?

            </h1>
            <div className="flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>

        </Layout>
    );
}