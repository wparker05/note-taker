const express = require('express');
const {v4: uuidv4} = require('uuid');
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



app.get('/api/notes', (req,res) =>{
    
   fs.readFile('./db/db.json', 'utf-8',(err, data) =>{
       if(err) {
           console.error(err);
       } else {
           res.json(JSON.parse(data));
       }
   }
   );
});



app.post('/api/notes', (req,res) => {
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
    
       

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err){
            console.error(err)
        } else {
            const parseData = JSON.parse(data);
            parseData.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(parseData, null, 2), (err) =>{
                err ? console.error(err) : console.log("data added to db");
            })
        }

        res.json(JSON.parse(data));
    })
    }
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
