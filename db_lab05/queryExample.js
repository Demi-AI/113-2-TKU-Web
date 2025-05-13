// queryExample.js
const { sequelize, Student, Enrollment, Course } = require('./models');

async function findUngraded() {
    try {
        // 查詢所有「未評分」的學生與課程資料
        const results = await Student.findAll({
            // include 表示要加入關聯資料
            include: [{
                model: Course, // 每筆選課記錄包含一門課程
                through: {
                    where: { Grade: null } //透過 ENROLLMENT 過濾，篩選條件：尚未給成績
                },
                attributes: ['Course_ID', 'Title'] // 只取課程編號與名稱
            }],
            attributes: ['Student_ID', 'Name'] // 只顯示學生學號與姓名
        });

        // 輸出查詢結果
        console.log('未評分的選課記錄：');
        results.forEach(student => {
            student.Courses.forEach(course => {
                console.log(`學生：${student.Name} (${student.Student_ID}), 課程：${course.Title} (${course.Course_ID})`);
            });
        });

        return results;
    } catch (err) {
        console.error('查詢失敗：', err);
    }
}

findUngraded();