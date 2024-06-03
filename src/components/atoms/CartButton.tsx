import { FC } from "react";
import { FloatButton } from "antd";

const CartButton: FC = () => (
  <>
    <FloatButton.Group shape="circle" style={{ right: 24 + 70 }}>
      <FloatButton
        href="https://ant.design/index-cn"
        tooltip={<div>custom badge color</div>}
        badge={{ count: 2, color: "blue" }}
      />
    </FloatButton.Group>
  </>
);

export default CartButton;
