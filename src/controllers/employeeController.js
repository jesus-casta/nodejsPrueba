import { Employee } from '../models/mysql/index.js';

export async function listEmployees(req, res, next) {
  try {
    const { departamento } = req.query;
    const where = {};
    if (departamento) where.departamento = departamento;

    const rows = await Employee.findAll({ where });
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

export async function getEmployeeById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await Employee.findByPk(id);

    if (!row) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function createEmployee(req, res, next) {
  try {
    const payload = req.body;

    if (!payload?.nombre_completo || !payload?.email || !payload?.departamento || !payload?.fecha_ingreso) {
      return res.status(400).json({ message: 'Faltan campos obligatorios del empleado' });
    }

    const created = await Employee.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
}

export async function updateEmployee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await Employee.findByPk(id);

    if (!row) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    await row.update(req.body);
    return res.json(row);
  } catch (error) {
    return next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    const id = Number(req.params.id);
    const deleted = await Employee.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Empleado no encontrado' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
