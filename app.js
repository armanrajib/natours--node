import fs from 'fs';
import express from 'express';

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);

    if (!tour)
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });

    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };
    const updatedTours = [...tours, newTour];

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    });
});

app.patch('/api/v1/tours/:id', (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);

    if (!tour)
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });

    const updatedTour = { ...tour, ...req.body };
    const updatedTours = tours.map((el) => (el.id === id ? updatedTour : el));

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), (err) => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour,
            },
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
