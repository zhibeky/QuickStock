// Cart.tsx
import { useState } from "react";
import { AddToCartForm } from "../molecules/AddToCartForm.tsx";
import ProductTable from "../organisms/ProductTable.tsx";
import { Button } from "../atoms/Button.tsx";
import { IProduct } from "../../types/types";

export const Cart = () => {
  // State to store the list of product IDs added to the cart
  const [cartProducts, setCartProducts] = useState<string[]>([]);
  const [productDetails, setProductDetails] = useState<IProduct[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [purchasedProducts, setPurchasedProducts] = useState<IProduct[]>([]);

  // Function to add product ID to the cart
  const addToCart = async (productId: string) => {
    setCartProducts([...cartProducts, productId]);
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: [productId] }),
      });
      if (response.ok) {
        const result = await response.json();
        setProductDetails([...productDetails, ...result.products]);
      } else {
        alert("Failed to fetch product details");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching product details");
    }
  };

  const makePurchase = async () => {
    if (cartProducts.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productIds: cartProducts }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setPurchasedProducts(result.products);
        setCartProducts([]);
        setProductDetails([]);
      } else {
        alert("Purchase failed");
      }
    } catch (error) {
      alert("Error making purchase");
      console.error(error);
    }
  };

  return (
    <div className="add-to-cart">
      <AddToCartForm onAddToCart={addToCart} />
      <ProductTable products={productDetails} />
      <Button type="primary" onClick={makePurchase}>
        Купить
      </Button>
    </div>
  );
};
