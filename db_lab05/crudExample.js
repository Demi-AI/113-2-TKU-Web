// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    // 要查詢的 Student_ID
    const studentId = 'S10811001';

    // 要變更的 Name
    const changeName = '王明';

    // 要新增的學生資料
    const newName = '王跌跌';
    const newStudentId = 'S10831020';
    const newBirth_Date = '2003-12-27';
    const newGender = 'F';
    const newEmail = 'demi921227@example.com';
    const newPhone = '0952-350-818';
    const newAddress = '新北市三重區車路頭街122巷39號';
    const newAdmission_Year = '2025';
    const newStatus = '在學';
    const newDepartmentId = 'CS001';
    
    // 先查詢是否有這位學生 (SELECT)
    const result = await conn.query('SELECT * FROM STUDENT WHERE Student_ID = ?', [studentId]);
    console.log('查詢結果：', result);

    if (result.length == 0) {
        console.log('查無此人');
        return;
    }

    // 有找到才進行更新 (UPDATE)
    await conn.query('UPDATE STUDENT SET Name = ? WHERE Student_ID = ?', [changeName, studentId]);
    console.log('已更新學生名稱');

    // 新增一名學生 (INSERT)
    await conn.query('INSERT INTO STUDENT (Student_ID, Name, Birth_Date, Gender, Email, Phone, Address, Admission_Year, Status, Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [newStudentId, newName, newBirth_Date, newGender, newEmail, newPhone, newAddress, newAdmission_Year, newStatus, newDepartmentId]);
    console.log('已新增一筆學生資料');

    // 刪除一名學生 (DELETE)
    await conn.query('DELETE FROM STUDENT WHERE Student_ID = ?', [newStudentId]);
    console.log('已刪除該學生');
    
  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

basicCrud();
