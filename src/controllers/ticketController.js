import { Ticket } from '../models/mongo/Ticket.js';

export async function listTickets(req, res, next) {
  try {
    const { prioridad, estado, id_equipo_mysql } = req.query;
    const filter = {};

    if (prioridad) filter.prioridad = prioridad;
    if (estado) filter.estado = estado;
    if (id_equipo_mysql) filter.id_equipo_mysql = Number(id_equipo_mysql);

    const rows = await Ticket.find(filter).sort({ fecha_creacion: -1 });
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getTicketById(req, res, next) {
  try {
    const row = await Ticket.findById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function createTicket(req, res, next) {
  try {
    const payload = req.body;

    if (!payload?.id_equipo_mysql || !payload?.asunto || !payload?.descripcion || !payload?.prioridad) {
      return res.status(400).json({ message: 'Faltan campos obligatorios del ticket' });
    }

    const created = await Ticket.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
}

export async function updateTicket(req, res, next) {
  try {
    const row = await Ticket.findById(req.params.id);
    if (!row) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    Object.assign(row, req.body);
    await row.save();
    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function deleteTicket(req, res, next) {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
