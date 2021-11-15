let xhr = new XMLHttpRequest()

xhr.open('GET', 'http://localhost:8888/getWeather', true)
xhr.onload = function () {
  document.querySelector('span').innerText = JSON.parse(xhr.responseText).data
}

xhr.onerror = function () {
  console.log('服务器异常')
}

xhr.send()