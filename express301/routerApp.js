const express = require('express');
const app = express();
const helmet = require('helmet');
const port = 3000;

app.use(helmet());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));

const router = require('./theRouter');
const adminRouter = require('./theAdminRouter');

app.use('/',router);
app.use('/admin',adminRouter);
app.use('/admin/search',adminRouter);



app.listen(port);