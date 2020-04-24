const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config(); //dotenv to read .env varriables into Node application

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/jwtAuthentication', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
mongoose.connection
    .once('open', () => console.log('DB connection Successful!'))
    .on('error', error => {
        console.log('Error in DB connection!', error);
    });

//start the server
app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

//middleware : serving REST API routes
app.use('/user', require('./api/routes/user.js'));

// API calls
app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});
