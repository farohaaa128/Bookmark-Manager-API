const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const bookMark = require('./routes/bookMarkRoutes');
const user = require('./routes/userRoutes');
require('dotenv').config();


dns.setServers(["8.8.8.8", "8.8.4.4"]);

const App = express();

App.use(express.json());

const URL = process.env.DB_URL;
mongoose.connect(URL).then(() => {
    console.log("Connected To MongoDB Done !")
}).catch((err) => {
    console.log("Error Connecting To MongoDB", err);
});

App.use('/bookmarks', bookMark);
App.use('/user', user);

App.use((req, res) => {
    res.status(404).send("Not Found");
})

App.listen(process.env.PORT , () =>
{
    console.log(`This Server Running On ${process.env.Port}`);
});