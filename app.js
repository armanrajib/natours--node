import express from 'express';

const app = express();

app.get('/', (req, res) => {
    // res.status(200).send('Hello, Express! (Server side)');
    res.status(200).json({ app: 'Natours', message: 'Hello, Express! (Server side)' });
});

app.post('/', (req, res) => {
    res.status(200).send('You can post to this endpoint...');
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
