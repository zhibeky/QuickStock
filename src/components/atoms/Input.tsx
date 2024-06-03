import React from "react";
import { Input as AntInput, InputProps } from "antd";

interface Props extends InputProps {
  // You can add additional props specific to your application
}

export const Input: React.FC<Props> = (props) => {
  return <AntInput {...props} />;
};

// export default Input;
