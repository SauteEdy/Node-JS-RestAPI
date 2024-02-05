const express = require('express');
const bodyParser = require('body-parser');
const {connection, checkConnection} = require('./dataBase.js');
const router = require('./userRoutes.js')
const app = express();
const PORT = 5500;

app.use(bodyParser.json());
app.get('/', router);
app.post('/new-user', router);
app.put('/update/:id', router)


app.listen(PORT, ()=>{
    console.log(`app listennig on port ${PORT}`);
    connection;
    checkConnection();
})