import fs from 'fs';

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// TOURS ROUTE HANDLERS
// --------------------

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

export { getAllTours, createTour, getTour, updateTour, deleteTour };
