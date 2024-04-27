// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsx = require('xlsx')
const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update with your client's origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


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


app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
