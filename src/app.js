const express = require('express');

const hostname = '0.0.0.0';
const port = 3000;

const cors = require('cors');

const server = express();

server.use(cors({
    credentials: true,
    origin: 'http://localhost'
}));


const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/apinode');

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());


const teamRoute = require('./routes/teamRoute');
teamRoute(server);


server.listen(port, hostname);