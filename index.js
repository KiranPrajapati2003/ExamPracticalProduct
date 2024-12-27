const bodyParser = require('body-parser');
const express = require('express')
const path = require('path');
const  db  = require('./config/database');
const app = express();
const port = 3032;
const cookieParser = require("cookie-parser")


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/assets')))
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.use(cookieParser());

app.use('/',require('./routers'))

app.listen(port, (err) => {
    if (err) {
        console.log('server not connect');
        return false;
    }
    db();
    console.log('server is connected http://localhost:' + port);

})