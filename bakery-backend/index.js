const express= require('express')
const b = require('./controller');
const app=express()
const db = require("./db");
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/products', b.getProducts);
app.get('/tables', b.getTables);
app.post('/tab', b.addOrCheckUser);
app.post('/tabupdate', b.tableUpdate);
app.post('/order', b.orderItems);
app.post('/login', b.login);
app.get('/getpending', b.getPendingOrders);


app.listen(9000,()=> console.log("Running on 9000"))