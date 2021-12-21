const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.hmtl'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
