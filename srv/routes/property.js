import express from 'express';
import { roleMiddleware } from '../middleware/auth.js';
import * as propertyController from '../controllers/property.js';

const router = express.Router()

router.get('/listings', roleMiddleware, propertyController.getListings);
router.get('/listings/:id', roleMiddleware, propertyController.getListingDetails);

export default router;