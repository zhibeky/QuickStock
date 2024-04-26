import { useEffect, useState } from "react";
// Optional: import styled-components or your preferred styling library
export interface IProduct {
  id: number;
  name: string;
  purchase_price: number; // Handle potential spaces in property names
  selling_price: number;
  quantity: number;
  source_of_purchase: string;
  minimal_amount: number;
}

// eslint-disable-next-line react-hooks/rules-of-hooks

const DataTable = () => {
  const [data, setData] = useState<IProduct[]>([]); // Use useState for data management
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
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Purchase Price</th>
          <th>Selling Price</th>
          <th>Quantity</th>
          <th>Source of Purchase</th>
          <th>Minimal Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            {" "}
            {/* Use a unique key for each row */}
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product["purchase_price"]}</td>{" "}
            {/* Access property with spaces */}
            <td>{product["selling_price"]}</td>
            <td>{product.quantity}</td>
            <td>{product["source_of_purchase"]}</td>
            <td>{product["minimal_amount"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
