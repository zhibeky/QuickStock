// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsx = require('xlsx')
const cors = require('cors');
const {resolve} = require("path");
const app = express()

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update with your client's origin
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

const readProductsFromXlsx = () => {
  const workbook = xlsx.readFile('./db.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const products = xlsx.utils.sheet_to_json(sheet);
  return products;
};
const writeProductsToXlsx = (products) => {
  const workbook = xlsx.utils.book_new();
  const sheet = xlsx.utils.json_to_sheet(products);
  xlsx.utils.book_append_sheet(workbook, sheet, 'Products');
  xlsx.writeFile(workbook, resolve(__dirname, './db.xlsx'));
};


app.post('/', (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds)) {
    return res.status(400).send('Bad Request: productIds must be an array');
  }

  const products = readProductsFromXlsx();
  const productDetails = products.filter(product => productIds.includes(String(product.id)));

  if (productDetails.length === 0) {
    return res.status(404).send('No products found for the given IDs');
  }

  res.status(200).json({ message: 'Purchase made successfully', products: productDetails });
});

app.post('/purchase', (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds)) {
    return res.status(400).send('Bad Request: productIds must be an array');
  }

  let products = readProductsFromXlsx();
  let updatedProducts = [];

  productIds.forEach(id => {
    let product = products.find(p => String(p.id) === id)
    if (product && product.quantity > 0) {
      product.quantity -= 1
      updatedProducts.push(product)
    }
  });

  writeProductsToXlsx(products);

  res.status(200).json({message: "Purchase made successfully", products: updatedProducts});

});

app.get('/read-excel', (req, res) => {
  try {
    const data = readProductsFromXlsx();
    res.json(data)

  } catch (error) {
    console.error('Error reading Excel file:', error)
    res.status(500).send({ error: 'Internal server error' })
  }
})
app.get('/get-low-stock-products', async (req, res) => {
  try {
    const data = readProductsFromXlsx();

    const lowStockProducts = data.filter(product => product.quantity < product.minimal_amount); // Adjust property names

    res.json(lowStockProducts);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
