import React from "react";
import { Table } from "antd";
import { IProduct } from "../../types/types";

interface ProductTableProps {
  products: IProduct[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const columns = [
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
      title: "Price",
      dataIndex: "selling_price",
      key: "selling_price",
    },
  ];

  return (
    <div>
      <h3>Purchased Products</h3>
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductTable;
