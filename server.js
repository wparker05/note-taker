const express = require('express');

const PORT = prcess.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
