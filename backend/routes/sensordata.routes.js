import { Router } from 'express';

const sensordataRoutes = Router();
import {addSensorData, getSensorData} from '../controllers/sensordata.controller.js';

sensordataRoutes.get('/', getSensorData);

sensordataRoutes.post('/', addSensorData);

export default sensordataRoutes;