const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();

const multer = require('multer'); // v1.0.5
const upload = multer(); // for parsing multipart/form-data

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//----------------------------------------



app.post('/stt',upload, function (req, res) {

   
});


app.listen(PORT, () => console.log(`Listening on ${PORT}`));