import { Router } from 'express';
import {
  createEquipment,
  deleteEquipment,
  getEquipmentById,
  listEquipment,
  updateEquipment
} from '../controllers/equipmentController.js';

const router = Router();

router.get('/', listEquipment);
router.get('/:id', getEquipmentById);
router.post('/', createEquipment);
router.put('/:id', updateEquipment);
router.delete('/:id', deleteEquipment);

export default router;
