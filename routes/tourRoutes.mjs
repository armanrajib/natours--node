import express from 'express';

import {
    getAllTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    aliasTopTours,
    getTourStats,
} from '../controllers/tourController.mjs';

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
