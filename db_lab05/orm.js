// orm.js
const { Sequelize, DataTypes } = require('sequelize');

// 建立 Sequelize 實例
const sequelize = new Sequelize('university_db', 'root', '921227', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false // 關閉 SQL 輸出 (也可以開啟，但為了美觀暫時不開)
});

module.exports = { sequelize, DataTypes };

// 匯入所有模型和關聯設定
require('./models');  // 這會自動引入 models/index.js，並設置所有模型的關聯

// 測試資料庫連線和同步
async function testConnection() {
  try {
    // 測試資料庫連線
    await sequelize.authenticate();
    console.log('資料庫連線成功！');
    
    // 同步模型（不會破壞資料）
    await sequelize.sync();
    console.log('所有模型已同步到資料庫！');
  } catch (err) {
    console.error('資料庫連線錯誤：', err);
  } finally {
    await sequelize.close();  // 關閉資料庫連線
  }
}

// 測試連線和同步
testConnection();
