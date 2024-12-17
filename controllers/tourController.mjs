import fs from 'fs';

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// PARAM MIDDLEWARE (TOUR ID)
const checkTourId = (req, res, next, val) => {
    const tour = tours.find(el => el.id === Number(val));

    if (!tour)
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });

    next();
};

// checkBody MIDDLEWARE (before createTour)
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        });
    }
    next();
};

// TOURS ROUTE CONTROLLERS
// -----------------------

const getAllTours = (req, res) => {
    console.log(req.requestTime);

    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours
        }
    });
};

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };
    const updatedTours = [...tours, newTour];

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
};

const getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};

const updateTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find(el => el.id === id);
    const updatedTour = { ...tour, ...req.body };
    const updatedTours = tours.map(el => (el.id === id ? updatedTour : el));

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(200).json({
            status: 'success',
            data: {
                tour: updatedTour
            }
        });
    });
};

const deleteTour = (req, res) => {
    const id = Number(req.params.id);
    const updatedTours = tours.filter(el => el.id !== id);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), err => {
        res.status(204).json({
            status: 'success',
            data: null
        });
    });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour, checkTourId, checkBody };
