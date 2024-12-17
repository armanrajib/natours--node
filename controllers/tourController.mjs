import fs from 'fs';

import Tour from '../models/tourModel.mjs';

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// PARAM MIDDLEWARE (TOUR ID)
// --------------------------
// const checkTourId = (req, res, next, val) => {
//     const tour = tours.find((el) => el.id === Number(val));

//     if (!tour)
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//         });

//     next();
// };

// checkBody MIDDLEWARE (before createTour)
// ----------------------------------------
// const checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price',
//         });
//     }
//     next();
// };

// TOURS ROUTE CONTROLLERS
// -----------------------

const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find({}, { __v: 0 });
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

const getTour = async (req, res) => {
    try {
        // const tour = await Tour.findOne({ _id: req.params.id });
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

const updateTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);
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
    const updatedTours = tours.filter((el) => el.id !== id);

    fs.writeFile('./dev-data/data/tours-simple.json', JSON.stringify(updatedTours), (err) => {
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
};

export { getAllTours, createTour, getTour, updateTour, deleteTour };
