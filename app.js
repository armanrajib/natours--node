import fs from 'fs';
import express from 'express';
import morgan from 'morgan';

const app = express();

// MIDDLEWARE 1 (THIRD-PARTY)
app.use(morgan('dev'));

// MIDDLEWARE 2
app.use(express.json());

// MIDDLEWARE 3 (CUSTOM)
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

// MIDDLEWARE 4 (CUSTOM)
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours,
        },
    });
};

const createTour = (req, res) => {
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
};

const getTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);

    if (!tour)
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });

    const updatedTours = tours.filter((el) => el.id !== id);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), (err) => {
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
