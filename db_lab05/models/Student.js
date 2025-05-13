const { sequelize, DataTypes } = require('../orm');

const Student = sequelize.define('Student', {
  Student_ID: {
    type: DataTypes.STRING(9),
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Gender: {
    type: DataTypes.CHAR(1),
    validate: {
      isIn: [['M', 'F']]
    }
  },
  Email: {
    type: DataTypes.STRING(100),
    unique: true
  },
  Birth_Date: {
    type: DataTypes.DATE
  },
  Phone: {
    type: DataTypes.STRING(15)
  },
  Address: {
    type: DataTypes.STRING(200)
  },
  Admission_Year: {
    type: DataTypes.INTEGER
  },
  Status: {
    type: DataTypes.STRING(10),
    validate: {
      isIn: [['在學', '休學', '畢業', '退學']]
    }
  },
  Department_ID: {
    type: DataTypes.STRING(5),
    references: {
      model: 'Department',
      key: 'Department_ID'
    }
  }
}, {
  tableName: 'STUDENT',
  timestamps: false
});

module.exports = Student;
