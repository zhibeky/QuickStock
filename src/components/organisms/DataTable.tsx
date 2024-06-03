import React, { useEffect, useState } from "react";
import DataTableControls from "../molecules/DataTableControls";
import { Table } from "antd";
import type { TableProps } from "antd";
import type { IProduct } from "../../types/types.ts";

const columns: TableProps<IProduct>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Purchase Price",
    dataIndex: "purchase_price",
    key: "purchase_price",
  },
  {
    title: "Selling Price",
    dataIndex: "selling_price",
    key: "selling_price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Source of Purchase",
    dataIndex: "source_of_purchase",
    key: "source_of_purchase",
  },
  {
    title: "Minimal Amount",
    dataIndex: "minimal_amount",
    key: "minimal_amount",
  },
];

const DataTable: React.FC = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const [showLowQuantity, setShowLowQuantity] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/read-excel");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: IProduct[] = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching Excel data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterButtonClick = () => {
    setShowLowQuantity((prev) => !prev);
  };

  const filteredData = showLowQuantity
    ? data.filter((product) => product.quantity < product.minimal_amount)
    : data;

  return (
    <div>
      <DataTableControls
        showLowQuantity={showLowQuantity}
        onFilterButtonClick={handleFilterButtonClick}
      />
      <Table
        columns={columns}
        dataSource={filteredData.map((item) => ({
          ...item,
          key: item.id,
        }))}
      />
    </div>
  );
};

export default DataTable;
