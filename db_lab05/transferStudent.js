// transferStudent.js
const { sequelize, Student, Course, Enrollment } = require('./models');

async function transferStudent(studentId, oldDeptId, newDeptId) {
  const transaction = await sequelize.transaction();
  try {
    // 1. 更新學生所屬系所
    await Student.update(
      { Department_ID: newDeptId },
      { where: { Student_ID: studentId }, transaction }
    );

    // 2. 標記舊系所必修課程為「轉系退選」
    const oldDeptCourses = await Course.findAll({
      where: {
        Department_ID: oldDeptId,
        Is_Required: true
      },
      attributes: ['Course_ID'],
      transaction
    });

    const oldCourseIds = oldDeptCourses.map(c => c.Course_ID);

    await Enrollment.update(
      { Status: '轉系退選' },
      {
        where: {
          Student_ID: studentId,
          Course_ID: oldCourseIds
        },
        transaction
      }
    );

    // 3. 查詢新系所必修課程
    const newDeptCourses = await Course.findAll({
      where: {
        Department_ID: newDeptId,
        Is_Required: true
      },
      attributes: ['Course_ID'],
      transaction
    });

    // 4. 加選新系所必修課程
    const currentSemester = '112-2';

    const enrollmentsToAdd = newDeptCourses.map(course => ({
      Student_ID: studentId,
      Course_ID: course.Course_ID,
      Semester: currentSemester,
      Status: '轉系加選'
    }));

    await Enrollment.bulkCreate(enrollmentsToAdd, { transaction });

    await transaction.commit();
    console.log(`學生 ${studentId} 已從 ${oldDeptId} 轉到 ${newDeptId}`);
  } catch (err) {
    await transaction.rollback();
    console.error('轉系處理失敗：', err);
  }
}

// 執行轉系功能（範例）
transferStudent('S10811005', 'CS001', 'EE001');
