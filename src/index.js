import _ from 'lodash'

function component() {
    let element = document.createElement('div');
  
    // 将 array 中的所有元素转换为由 separator 分隔的字符串
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());