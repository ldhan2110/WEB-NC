//DECLARE PACKAGE
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import asyncError from 'express-async-errors';
import config from 'config';
import mongoose from 'mongoose';

import userModel from './Models/Auth/UserModel.js';

//CONFIG SERVER
var app = express();
var dbConn = await mongoose.connect(config.get('dbConfig.URI'));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());



app.get('/', async function (req, res) {
    try {
        res.send(await userModel.findAll());
    } catch (err) {
        res.send(err);
    }
});

app.get('/adm/search', async function (req, res) {
  try {
      const usrId = req.query.id;
      res.send(await userModel.findById(usrId));
  } catch (err) {
      res.send(err);
  }
});

app.post('/adm/insert', async function (req, res) {
  try {
      const usrInfo = req.body;
      res.send(await userModel.addNewUsr(usrInfo));
  } catch (err) {
      res.send(err);
  }
});


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