
/**
 * 通过 dynamic import(动态导入) 来分离出一个 chunk
 */
async function getComponent(){
// function getComponent() {
    // return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default:_ })=>{
    //     let element = document.createElement('div');
    //     element.innerHTML = _.join(['hello', 'webpack'], ' ');
    //     return element;
    // }).catch(error => '加载lodash出现错误!');
    let element = document.createElement('div');
    // webpackChunkName将拆分出来的 bundle 命名为 lodash.bundle.js
    const { default:_ } = await import(/* webpackChunkName:"lodash" */ 'lodash')
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    return element;
}
getComponent().then(component => {
    document.body.appendChild(component);
})