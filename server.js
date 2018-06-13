'use strict';

const express = require('express');
const cors = require('cors');
const fileUpload = require("express-fileupload");

// require and use "multer"...

const app = express();
app.use(fileUpload());

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse', (req, res) =>{
  
  if (!req.files.upfile) {
    return res.status(400).send('No files were uploaded.')
  } else {
    let data = {
      name: req.files.upfile.name,
      type:  req.files.upfile.mimetype,
      size: req.files.upfile.data.length
    };
    res.json(data);
  };
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
