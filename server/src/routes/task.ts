import express from 'express';
import TaskController from '../controllers/task';
import { resolveToken } from '../jwt/tokenResolver';

const router = express.Router();

router.get('/', [resolveToken], TaskController.getTasks);
router.post('/', [resolveToken], TaskController.createOrModifyTask);
router.delete('/', [resolveToken], TaskController.deleteTask);

export = router;
