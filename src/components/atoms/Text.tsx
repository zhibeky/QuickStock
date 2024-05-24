import React from "react";

interface TextProps {
  // Define props for customizing text
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Text: React.FC<TextProps> = ({ children, className, style }) => {
  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
};

export default Text;
