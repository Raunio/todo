import express from 'express';
import controller from '../controllers/health';

const router = express.Router();

router.get('/', controller.healthCheck);

export = router;
