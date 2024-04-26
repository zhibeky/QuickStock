import { useState, useEffect } from "react";
import DataTable from './DataTable';
import "./App.css";

interface DbItem {
  id: number;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  sourceOfPurchase: string;
  minimalAmount: number;
}

function App() {
  const [excelData, setExcelData] = useState<DbItem[]>([]);

  const getExcelData = async () => {
    try {
      const response = await fetch("http://localhost:3000/read-excel");
      const data = await response.json();
      setExcelData(data);
    } catch (error) {
      console.error("Error fetching Excel data:", error);
    }
  };

  useEffect(() => {
    // fetch("/read-excel")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setExcelData(data);
    //     console.log(data);
    //   });
    getExcelData();
    // .catch((error) => {
    //   console.error("Error fetching Excel data:", error);
    // });
  }, []);
  return (
    <>
      <h1>Excel Data</h1>
      <DataTable />
      {/*<div>*/}
      {/*  {excelData.map((row, index) => (*/}
      {/*    <div key={index}>{JSON.stringify(row)}</div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </>
  );
}

export default App;
