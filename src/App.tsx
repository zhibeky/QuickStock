import { useState } from "react";
import DataTable from "./DataTable";
import { IProduct } from "./DataTable.tsx";
import LowStockButton from "./LowStockButton";

import "./App.css";

function App() {
  const [lowStockData, setLowStockData] = useState<IProduct[]>([]);
  return (
    <>
      <h1>Excel Data</h1>
      <DataTable />
      <h1>Low Stock</h1>
      <LowStockButton
        lowStockData={lowStockData}
        onLowStockDataChange={setLowStockData}
      />
      {lowStockData.length > 0 ? (
        <pre>{JSON.stringify(lowStockData, null, 2)}</pre>
      ) : (
        <p>No low-stock products found.</p>
      )}
    </>
  );
}

export default App;
