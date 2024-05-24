// ParentComponent.tsx
import React from "react";
import AddToCartForm from "../molecules/AddToCartForm.tsx";
import ProductTable from "../organisms/ProductTable.tsx";
import Button from "../atoms/Button.tsx";

const Cart = () => {
  // State to store the list of product IDs added to the cart
  const [cartProducts, setCartProducts] = React.useState<string[]>([]);
  const [purchasedProducts, setPurchasedProducts] = React.useState<any[]>([]);

  // Function to add product ID to the cart
  const addToCart = (productId: string) => {
    setCartProducts([...cartProducts, productId]);
  };
  const makePurchase = async () => {
    if (cartProducts.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cart", {
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
      } else {
        alert("Purchase failed");
      }
    } catch (error) {
      alert("Error making purchase");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <AddToCartForm onAddToCart={addToCart} />
      {/*<ProductTable*/}
      {/*  productIds={purchasedProducts.map((product) => product.id)}*/}
      {/*/>*/}
      <ProductTable products={purchasedProducts} />
      <Button type="primary" onClick={makePurchase}>
        Make Purchase
      </Button>
    </div>
  );
};

export default Cart;
