import { useState } from "react";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import ProductForm from "../../components/ProductForm";
export default function NewProduct() {
    return (
        <Layout>
            <h1 className={styles.new_prod_header}>New Product</h1>
            <ProductForm />
        </Layout>

    );
}