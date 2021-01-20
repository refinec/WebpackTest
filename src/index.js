import _ from 'lodash'
import {
  cube
} from './math'
import './style.css'
import Icon from './icon.png' // 此图像将被处理并添加到 output 目录,并且 Icon变量将包含该图像在处理后的最终 url

// 所导入的 Data 变量，将包含可直接使用的已被解析成的 JSON(xml被xml-loader处理为JSON对象)
// 在使用 d3 等工具实现某些数据可视化时，这个功能极其有用。
// 可以不用在运行时再去发送一个 ajax 请求获取和解析数据，
// 而是在构建过程中将其提前加载到模块中，以便浏览器加载模块后，直接就可以访问解析过的数据。
import Data from './data.xml'
import printMe from './print';

if (process.env.NODE_ENV !== 'production') {
  console.log('当前开发环境!!!');
}

function component() {
  let element = document.createElement('div');
  let btn = document.createElement('button');
  let pre = document.createElement('pre');
  // 将 array 中的所有元素转换为由 separator 分隔的字符串
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello'); // 添加style.css中的样式

  btn.innerHTML = '点击这里aaa，然后查看 console！';
  btn.onclick = printMe;
  element.appendChild(btn);

  // 将图像添加到已存在的div中
  let myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);

  console.log("xmlData:", Data);

  pre.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ].join('\n\n');
  document.body.appendChild(pre)
  return element;
}

// document.body.appendChild(component());
let element = component(); // 存储 element，以在 print.js 修改时重新渲染
document.body.appendChild(element);

if (module.hot) {
  // 在 print.js 内部发生变更时，告诉 webpack 接受 updated module
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    // printMe();
    document.body.removeChild(element);
    element = component(); // 重新渲染 "component"，以便更新 click 事件处理函数
    document.body.appendChild(element);
  })
}

/***
 * 注册 Service Worker,开始渐进式web应用
 */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('./service-worker.js')
    .then(registration =>{
      console.log('SW registered: ', registration);
    }).catch(registrationError =>{
      console.log('SW registration failed: ', registrationError);
    })
  })
}