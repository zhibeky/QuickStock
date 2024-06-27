import React from "react";
import { Button } from "../atoms";

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
      {showLowQuantity
        ? "Показать все продукты"
        : "Показать продукты малого количества"}
    </Button>
  );
};

export default DataTableControls;
