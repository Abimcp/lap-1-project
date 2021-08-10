const postRoutes = require('./controllers/routes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Love Island Reacts!');
});

app.post('/', (req, res) => {
    res.status(405).send('Not allowed!');
});

module.exports = app;
