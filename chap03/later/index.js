const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Article = require('./db').Article
const read = require('node-readability')

app.set('port', process.env.PORT || 3000)
//支持编码为JSON的请求消息体
app.use(bodyParser.json())
//支持编码为表单的请求消息体
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  '/css/bootstrap.css',
  express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);
//获取所有文章
app.get('/articles', (req, res, next) => {
  Article.all((err, articles) => {
    if (err) return next(err)
    res.send(articles)
  })
})
//创建一篇文章
app.post('/articles', (req, res, next) => {
  const url = req.body.url
  read(url, (err, result) => {
    if (err || !result) res.status(500).send('Error downloading article')
    Article.create(
      { title: result.title, content: result.content },
      (err, article) => {
        if (err) return next(err)
        res.send('OK')
      }
    )
  })
})
//获取指定文章
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.find(id, (err, article) => {
    if (err) return next(err)
    res.send(article)
  })
})
//删除指定文章
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id
  Article.delete(id, (err, article) => {
    if (err) return next(err)
    res.send(article)
  })
})

app.listen(app.get('port'), () => {
  console.log('App started on port', app.get('port'));
})

module.exports = app