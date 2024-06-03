import React, { useState } from "react";
import { Button, Input } from "../atoms";

interface AddToCartFormProps {
  onAddToCart: (productId: string) => void;
}
const AddToCartForm: React.FC<AddToCartFormProps> = ({ onAddToCart }) => {
  const [productId, setProductId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productId) {
      onAddToCart(productId);
      setProductId("");
    } else {
      alert("Please enter a valid product ID");
    }
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setProductId(e.target.value);
  // };

  // const makePurchase = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/cart/add", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ products }),
  //     });
  //     console.log("purchase made", await response.json());
  //   } catch (error) {
  //     console.error("Error adding product to cart:", error);
  //   }
  // };
  // const addToCart = () => {
  //   if (productId.trim() !== "") {
  //     onAddToCart(productId);
  //     setProductId("");
  //   }
  //   // console.log(products);
  // };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >
      <Input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter product ID"
      />
      <Button type="primary" htmlType="submit">
        Add to Cart
      </Button>
    </form>
  );
};

export default AddToCartForm;
