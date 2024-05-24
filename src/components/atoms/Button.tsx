import React from "react";
import { Button as AntButton, ButtonProps } from "antd";

interface Props extends ButtonProps {
  // You can add additional props specific to your application
}

const Button: React.FC<Props> = (props) => {
  return <AntButton {...props} />;
};

export default Button;
