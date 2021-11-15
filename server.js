//js之前是运行在浏览器里，那我们就可以使用浏览器的内置API，但换了个环境，相应的的就可以使用其他环境内置的Api
//比如下边的三个，第一个支持我们创建一个http服务器，第二个支持我们读取本地文件，第三个支持我们对url进行解析
const http = require('http')
const fs = require('fs')
const url = require('url')

//http.createServer()创建一个服务器，监听8080端口。
//服务器就是一个软件，安装在一个机器上，它监听一个端口，当这个端口有请求发过来时，它做出相应的响应
//有两个参数req和res，req是请求的对象（我们从前端发出的请求？），我们的请求被封装成了一个js的对象。res是返回的响应
http.createServer((req, res) => {
  //解析url
  let pathObj = url.parse(req.url, true)
  //pathname就是/后的东西(https://xiedaimala.com/weather?a=1&b=2 比如这里的weather,而query就是后边的值a=1&b=2)
  switch (pathObj.pathname) {
    case '/getWeather':
      if (pathObj.query.city === 'beijing') {
        res.end(JSON.stringify({ city: 'beijing', weather: 'sunny' }))
      } else {
        res.end(JSON.stringify({ city: pathObj.query.city, weather: 'unknown' }))
      }
      break
    default:
      try {
        let pathname = pathObj.pathname === '/' ? '/index.html' : pathObj.pathname
        //读取当前文件（其实就是读取当前的html），其中__dirname是指当前路径，
        res.end(fs.readFileSync(__dirname + pathname))
      } catch (e) {
        res.writeHead(404, 'Not Found')
        res.end('<h1>404 Not Found</h1>')
      }
  }
}).listen(8888)

console.log('open http://localhost:8888')