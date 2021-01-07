import _ from 'lodash'
import './style.css' 
import Icon from './icon.png' // 此图像将被处理并添加到 output 目录,并且 Icon变量将包含该图像在处理后的最终 url
import Data from './data.xml'

function component() {
    let element = document.createElement('div');
  
    // 将 array 中的所有元素转换为由 separator 分隔的字符串
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello'); // 添加style.css中的样式

    // 将图像添加到已存在的div中
    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    // 所导入的 Data 变量，将包含可直接使用的已被解析成的 JSON(xml被xml-loader处理为JSON对象)
    // 在使用 d3 等工具实现某些数据可视化时，这个功能极其有用。
    // 可以不用在运行时再去发送一个 ajax 请求获取和解析数据，
    // 而是在构建过程中将其提前加载到模块中，以便浏览器加载模块后，直接就可以访问解析过的数据。
    console.log("xmlData:",Data);

    return element;
  }
  
  document.body.appendChild(component());