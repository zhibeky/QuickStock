import { FC } from "react";
import { Button as AntButton, ButtonProps } from "antd";

// no need for this, you can use ButtonProps directly
interface Props extends ButtonProps {}

export const Button: FC<Props> = (props) => {
  return <AntButton {...props} />;
};
