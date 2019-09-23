const express = require('express')
const path = require('path')

const app = express()
const PORT = 9000

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});


app.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`)
})
