import { FC } from "react";
import { Input as AntInput, InputProps } from "antd";

interface Props extends InputProps {}

export const Input: FC<Props> = (props) => {
  return <AntInput {...props} />;
};
