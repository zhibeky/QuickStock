import { FC } from "react";
import { Table } from "antd";
import { IProduct } from "../../types/types";

interface ProductTableProps {
  products: IProduct[];
}
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Цена",
    dataIndex: "selling_price",
    key: "selling_price",
  },
];

const ProductTable: FC<ProductTableProps> = ({ products }) => {
  return (
    <div>
      <h3>Выбранные продукты</h3>
      <Table dataSource={products} columns={columns} rowKey="id" />
    </div>
  );
};

export default ProductTable;
