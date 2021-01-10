import _ from 'lodash'
function component(){
    let element = document.createElement('div');
    let button = document.createElement('button');
    let br = document.createElement('br');
    button.innerHTML = 'Click me and at the console。。。。.';
    element.appendChild(br);
    element.appendChild(button);
    // 请注意，由于涉及网络请求，因此需要在生产级站点/应用程序中显示一些加载指示。
    button.onclick = e => import(/* webpackChunkName: "lazyLoading" */ './print').then( module =>{
        let printMe =  module.default;
        printMe();
    })
    return element;
}
document.body.appendChild(component());