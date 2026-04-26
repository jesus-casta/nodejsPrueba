import { Router } from 'express';
import {
  createTicket,
  deleteTicket,
  getTicketById,
  listTickets,
  updateTicket
} from '../controllers/ticketController.js';

const router = Router();

router.get('/', listTickets);
router.get('/:id', getTicketById);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
