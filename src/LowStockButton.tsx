import { IProduct } from "./DataTable.tsx";

const LowStockButton = ({
  onLowStockDataChange,
}: {
  onLowStockDataChange: (data: IProduct[]) => void;
}) => {
  // const [lowStockData, setLowStockData] = useState<IProduct[]>([]);
  const handleButtonClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/get-low-stock-products",
        {
          method: "GET", // Adjust method if needed (e.g., POST)
        },
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching low stock products: ${response.status}`,
        );
      }

      const fetchedData = await response.json();
      onLowStockDataChange(fetchedData);
    } catch (error) {
      console.error("Error fetching low stock products:", error);
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>Get Low Stock Products (JSON)</button>
    </>
  );
};

export default LowStockButton;
