// models/Enrollment.js
const { sequelize, DataTypes } = require('../orm');

const Enrollment = sequelize.define('Enrollment', {
  Student_ID: {
    type: DataTypes.STRING(9),
    primaryKey: true
  },
  Course_ID: {
    type: DataTypes.STRING(8),
    primaryKey: true
  },
  Semester_ID: {
    type: DataTypes.STRING(6),
    primaryKey: true
  },
  Grade: {
    type: DataTypes.DECIMAL(4, 1),
    validate: {
      min: 0,
      max: 100
    }
  },
  Status: {
    type: DataTypes.STRING(10),
    defaultValue: '修課中'
  },
  Enrollment_Date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'ENROLLMENT',
  timestamps: false
});

module.exports = Enrollment;
