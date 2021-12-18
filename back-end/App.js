//DECLARE PACKAGE
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import asyncError from 'express-async-errors';
import config from 'config';
import mongoose from 'mongoose';

import itemRouter from './routes/item_routes.js';
import adminRouter from './routes/admin_routes.js';

//CONFIG SERVER
var app = express();
var dbConn = await mongoose.connect(config.get('dbConfig.URI'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/item/', itemRouter);
app.use('/api/admin/', adminRouter);


app.get('/err', function (req, res) {
  throw new Error('Error!');
});

app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).json({
    error: 'Something broke!'
  })
});

//PORT CONFIG
const PORT = process.env.PORT || config.get('server.PORT');
var server = app.listen(PORT, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Ung dung Node.js dang hoat dong tai dia chi: http://%s:%s", host, PORT)
});