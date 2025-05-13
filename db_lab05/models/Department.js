const { sequelize, DataTypes } = require('../orm');

const Department = sequelize.define('Department', {
  Department_ID: {
    type: DataTypes.STRING(5),
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Location: {
    type: DataTypes.STRING(50)
  },
  Phone: {
    type: DataTypes.STRING(15)
  },
  Established_Year: {
    type: DataTypes.INTEGER
  },
  Chair_ID: {
    type: DataTypes.STRING(6)
  },
  College: {
    type: DataTypes.STRING(30)
  }
}, {
  tableName: 'DEPARTMENT',
  timestamps: false
});

module.exports = Department;
