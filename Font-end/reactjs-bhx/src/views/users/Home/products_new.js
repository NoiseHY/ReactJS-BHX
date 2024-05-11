import React, { useState, useEffect } from "react";
import { fetchProductsNew } from "../../../services/productsServices";
import { Container } from "react-bootstrap";


function ProductsNew() {
  const [listProductsNew, setListProducts] = useState("");

  useEffect(() => {
    getProducts10();

  }, []);

  const getProducts10 = async () => {
    try {
      const res = await fetchProductsNew();
      if (res) {
        setListProducts(res)
      }
    } catch (error) {
      console.log('error fetching products')
    }
  }

  return (
    <>
      <Container>
        <div className="my-3 add-new">
          

        </div>

      </Container>
    </>

  );
}

export default ProductsNew;
