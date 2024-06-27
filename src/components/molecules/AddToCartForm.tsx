import {
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
} from "react";
import { Button } from "../atoms";
import { Input, InputRef } from "antd";

interface AddToCartFormProps {
  onAddToCart: (productId: string) => void;
}
export const AddToCartForm: FC<AddToCartFormProps> = ({ onAddToCart }) => {
  const [productId, setProductId] = useState("");
  const IdInput = useRef<InputRef | null>(null);

  // Immediate focus on Input
  useEffect(() => {
    if (IdInput.current) {
      // or, if Input component in your ref, then use input property like:
      // IdInput.current.input.focus();
      IdInput.current.focus();
    }
  }, []);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      // onAddToCart(productId);
      // setProductId("");
      handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (productId) {
      onAddToCart(productId);
      setProductId("");
    } else {
      alert("Please enter a valid product ID");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >
      <Input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Введите код продукта"
        ref={IdInput}
        onPressEnter={handleKeyPress}
      />
      <Button type="primary" htmlType="submit">
        Добавить в корзину
      </Button>
    </form>
  );
};
