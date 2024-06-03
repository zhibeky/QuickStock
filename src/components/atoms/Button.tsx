// don't use React keyword, instead import things from react, e.g.
// import { FC } from "react";
import React from "react";
import { Button as AntButton, ButtonProps } from "antd";

// no need for this, you can use ButtonProps directly
interface Props extends ButtonProps {
  // You can add additional props specific to your application
}
// TODO: no need
export const Button: React.FC<Props> = (props) => {
  return <AntButton {...props} />;
};

// prefer not default export
// export default Button;
