
const express = require('express');
const path = require('path');

var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('build'))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Started  on port ${port}`);
})

