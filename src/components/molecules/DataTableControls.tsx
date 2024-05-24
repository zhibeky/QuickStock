import React from "react";
import Button from "../atoms/Button.tsx";

interface DataTableControlsProps {
  showLowQuantity: boolean;
  onFilterButtonClick: () => void;
}

const DataTableControls: React.FC<DataTableControlsProps> = ({
  showLowQuantity,
  onFilterButtonClick,
}) => {
  return (
    <Button onClick={onFilterButtonClick}>
      {showLowQuantity ? "Show All Products" : "Show Low Quantity Products"}
    </Button>
  );
};

export default DataTableControls;
