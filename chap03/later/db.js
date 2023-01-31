const sqlite3 = require('sqlite3').verbose()
const dbName = 'later.sqlite'
const db = new sqlite3.Database(dbName)

//创建articles表
db.serialize(() => {
  const sql = `
  CREATE TABLE IF NOT EXISTS articles
  (id integer primary key, title, content TEXT)
  `;
  db.run(sql);
})

class Article {
  //获取所有文章
  static all(cb) {
     db.all('SELECT * FROM articles', cb)
  }
  //根据id选择指定文章
  static find(id, cb) {
    db.get('SELECT * FROM articles WHERE id = ?', id, cb)
  }
  //创建文章
  static create(data, cb) {
    const sql = 'INSERT INTO articles(title, content) VALUES (?, ?)';
    db.run(sql, data.title, data.content, cb);
  } 
  //根据id删除一篇文章
  static delete(id, cb) {
    if (!id) return cb(new Error('Please provide an id'));
    db.run('DELETE FROM articles WHERE id = ?', id, cb);
  }
 }

module.exports = db
module.exports.Article = Article