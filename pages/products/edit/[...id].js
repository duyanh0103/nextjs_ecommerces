import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import { useRouter } from "next/router";
import axios from "axios";
import ProductForm from "../../../components/ProductForm";
export default function editProductPage() {
    // set state
    const [productInfo, setProductInfo] = useState(null);
    // TODO: fetch product of the ID in URL
    const router = useRouter();
    // console.log({router});
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            // nếu không có id thì cứ return về mà không cần hỏi về 1 prod nào
            return;
        }
        // fetch product of the ID
        axios.get('/api/products?id=' + id).then(response => {
            // console.log(response.data);
            setProductInfo(response.data);
        });
    }, [id]);
    return (
        <Layout>
            <h1>Edit Product</h1>
            {productInfo && (<ProductForm {...productInfo} />)}
        </Layout>
    )
}