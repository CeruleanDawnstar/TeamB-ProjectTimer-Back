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


<<<<<<< HEAD
const teamRoute = require('./routes/teamRoute');
teamRoute(server);

const userRoute = require('./routes/userRoute');
userRoute(server);

=======
const userRoute = require('./routes/userRoute');
userRoute(server);

const projectRoute = require('./routes/projectRoute');
projectRoute('server');

const timerRoute = require('./routes/timerRoute');
timerRoute(server);
>>>>>>> 8e49bc8d9f0411bc27600caab75ea180d698686a

server.listen(port, hostname);