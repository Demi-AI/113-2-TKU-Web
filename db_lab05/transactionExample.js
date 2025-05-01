// transactionExample.js
const pool = require('./db');

async function doTransaction() {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 開始交易
    
    /*
    假設要同時將學生 'S10810005' 的系所由 CS001 換成 EE001
    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, ['EE001', 'S10810005']);
    */
    
    // 要查詢的 Student_ID
    const studentId = 'S10811005';

    // 要變更的 DepartmentId
    const changeDepartmentId = 'EE001';

    // 先查詢是否有這位學生
    const result = await conn.query('SELECT * FROM STUDENT WHERE Student_ID = ?', [studentId]);
    console.log('查詢結果：', result);

    if (result.length == 0) {
        console.log('查無此人');
        return;
    }

    // 有找到才進行更新系所
    const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
    await conn.query(updateStudent, [changeDepartmentId, studentId]);
    
    // 如果以上操作都成功，則提交交易
    await conn.commit();
    console.log('交易成功，已提交');

    // 查詢目前的系所名稱
    const check = await conn.query('SELECT Student_ID, Name, Department_ID FROM STUDENT WHERE Student_ID = ?', [studentId]);
    if (check.length > 0) {
        console.log('修改後的學生資料：', check);
    }

  } catch (err) {
    // 若有任何錯誤，回滾所有操作
    if (conn) await conn.rollback();
    console.error('交易失敗，已回滾：', err);
  } finally {
    if (conn) conn.release();
  }
}

doTransaction();
