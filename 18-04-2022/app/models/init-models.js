import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _department from  "./department.js";
import _employee from  "./employee.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const department = _department.init(sequelize, DataTypes);
  const employee = _employee.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  employee.belongsTo(department, { as: "dept", foreignKey: "dept_id"});
  department.hasMany(employee, { as: "employees", foreignKey: "dept_id"});

  return {
    department,
    employee,
    user,
  };
}
