import { Category, Equipment } from '../models/mysql/index.js';

export async function listEquipment(req, res, next) {
  try {
    const { estado, categoria, marca } = req.query;
    const where = {};

    if (estado) where.estado = estado;
    if (categoria) where.id_categoria = Number(categoria);
    if (marca) where.marca = marca;

    const rows = await Equipment.findAll({ where, include: [Category] });
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getEquipmentById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await Equipment.findByPk(id, { include: [Category] });

    if (!row) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function createEquipment(req, res, next) {
  try {
    const payload = req.body;

    if (!payload?.marca || !payload?.modelo || !payload?.numero_serie || !payload?.id_categoria) {
      return res.status(400).json({ message: 'Faltan campos obligatorios del equipo' });
    }

    const created = await Equipment.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
}

export async function updateEquipment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await Equipment.findByPk(id);

    if (!row) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    await row.update(req.body);
    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function deleteEquipment(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await Equipment.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
