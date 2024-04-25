// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  console.log('Here')
  res.render('index')

})

app.listen(3000)
