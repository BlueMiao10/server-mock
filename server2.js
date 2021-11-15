const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req, res) => {
  let pathObj = url.parse(req.url)
  /*当我们访问http://localhost:8888时，服务器收到请求，解析完url后执行下边的判断，此时pathname不等于
  /getWeather，所以执行else{}，根据路径找到index.html，执行index.html时执行到ajax
  再次发送请求，此时访问的接口是http://localhost:8888/getWeather，执行判断，返回响应*/
  if (pathObj.pathname === '/getWeather') {
    res.end(JSON.stringify({ data: '晴' }))
  } else {
    res.end(fs.readFileSync(__dirname + '/index.html'))
  }

  console.log(pathObj)
}).listen(8888)

console.log('open http://localhost:8888')