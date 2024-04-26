import { useEffect, useState } from "react";
// Optional: import styled-components or your preferred styling library
interface Product {
  id: number;
  name: string;
  "purchase price": number; // Handle potential spaces in property names
  "selling price": number;
  quantity: number;
  "source of purchase": string;
  "minimal amount": number;
}

// eslint-disable-next-line react-hooks/rules-of-hooks

const DataTable = () => {
  const [data, setData] = useState<Product[]>([]); // Use useState for data management
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/read-excel");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: Product[] = await response.json();
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
            <td>{product["purchase price"]}</td>{" "}
            {/* Access property with spaces */}
            <td>{product["selling price"]}</td>
            <td>{product.quantity}</td>
            <td>{product["source of purchase"]}</td>
            <td>{product["minimal amount"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
