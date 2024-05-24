// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsx = require('xlsx')
const cors = require('cors');
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
  origin: 'http://localhost:5173' // Update this to your frontend's origin
}));

const readProductsFromXlsx = () => {
  const workbook = xlsx.readFile('./db.xlsx');
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const products = xlsx.utils.sheet_to_json(sheet);
  return products;
};


app.get('/', (req, res) => {
  console.log('Here')
  res.send({ text: 'Zhibek' })
})

app.get('/read-excel', (req, res) => {
  try {
    const workbook = xlsx.readFile('./db.xlsx')
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = xlsx.utils.sheet_to_json(sheet)

    res.json(data)

  } catch (error) {
    console.error('Error reading Excel file:', error)
    res.status(500).send({ error: 'Internal server error' })
  }
})
app.get('/get-low-stock-products', async (req, res) => {
  try {
    const workbook = xlsx.readFile('./db.xlsx'); // Assuming 'db.xlsx' is in the same directory
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const lowStockProducts = data.filter(product => product.quantity < product.minimal_amount); // Adjust property names

    res.json(lowStockProducts);
  } catch (error) {
    console.error('Error reading Excel file:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.use(express.json());

app.post('/cart', (req, res) => {
  const { productIds } = req.body;

  if (!productIds || !Array.isArray(productIds)) {
    return res.status(400).send('Bad Request: productIds must be an array');
  }

  const products = readProductsFromXlsx();

  // Fetch product details based on productIds
  const productDetails = products.filter(product => productIds.includes(String(product.id)));

  if (productDetails.length === 0) {
    return res.status(404).send('No products found for the given IDs');
  }

  // Process purchase (simplified example)
  productDetails.forEach(product => {
    console.log(`Product purchased: ${product.name}`);
    // Here you would update your database to reflect the purchase
  });

  res.status(200).json({ message: 'Purchase made successfully', products: productDetails });
});

// let cart = [];
//
// app.post('/cart', (req, res) => {
//   const { products } = req.body;
//   cart.push(products);
//   res.status(200).json({ message: 'Product added successfully' });
// });
// app.get('/cart', (req, res) => {
//   // Retrieve products in the cart by their IDs
//   const cartProducts = products.filter(product => cart.includes(product.id));
//
//   if (cartProducts.length > 0) {
//     res.json(cartProducts);
//   } else {
//     res.status(404).send('No products in cart');
//   }
// });


app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
