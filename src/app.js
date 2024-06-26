const express = require('express');
const cors = require('cors');
const pasteService = require('./services/pasteService');

const app = express();
app.use(cors());
app.use(express.text());
const port = 8080;

app.post('/', pasteService.createPaste);

app.get('/:hash', pasteService.getPasteByHash);

app.delete('/:hash', pasteService.deletePasteByHash);

app.listen(port, () => {
  console.log(`Pastebin app listening on port ${port}`);
});