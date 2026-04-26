import { Category } from './Category.js';
import { Employee } from './Employee.js';
import { Equipment } from './Equipment.js';
import { Assignment } from './Assignment.js';

Category.hasMany(Equipment, { foreignKey: 'id_categoria' });
Equipment.belongsTo(Category, { foreignKey: 'id_categoria' });

Employee.hasMany(Assignment, { foreignKey: 'id_empleado' });
Assignment.belongsTo(Employee, { foreignKey: 'id_empleado' });

Equipment.hasMany(Assignment, { foreignKey: 'id_equipo' });
Assignment.belongsTo(Equipment, { foreignKey: 'id_equipo' });

export { Category, Employee, Equipment, Assignment };
