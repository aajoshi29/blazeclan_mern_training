import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class employee extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'employee',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "employee_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
