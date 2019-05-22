const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

const requestData = (req, res, next) => {
  res.locals.startDate = new Date()
  res.locals.path = req.url
  res.locals.method = req.method
  next()

  req.on('end', () => {
    if (req.originalUrl.indexOf('favicon.ico') === -1) {
      const { startDate, path, method } = res.locals
      const nowDate = new Date()
      const times = nowDate - startDate
      console.log(`${startDate.toLocaleString()} | ${method} From ${path} | Total time: ${times}ms`)
    }
  })
}

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 列出全部 Todo
app.get('/', requestData, (req, res) => {
  res.render('index', { message: '顯示所有Todo' })
})

// 新增一筆 Todo 頁面
app.get('/new', requestData, (req, res) => {
  res.render('index', { message: '新增 Todo 頁面' })

  // responseData(req, res)
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', requestData, (req, res) => {
  res.render('index', { message: '顯示一筆Todo' })
  // responseData(req, res)
})

// 新增一筆  Todo
app.post('/', requestData, (req, res) => {
  res.render('index', { message: 'POST-新增一筆 Todo' })
  // responseData(req, res)
})

app.post('/:id/delete', requestData, (req, res) => {
  res.render('index', { message: 'POST-刪除 Todo' })
  // responseData(req, res)
})

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
