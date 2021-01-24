/**
 * 在 TypeScript 中使用非代码资源(non-code asset)，我们需要告诉 TypeScript 推断导入资源的类型。在项目里创建一个 custom.d.ts 文件，
 * 这个文件用来表示项目中 TypeScript 的自定义类型声明。我们为 .svg 文件设置一个声明：
 */

declare module "*.svg" {
    /**
     * 这里，我们通过指定任何以 .svg 结尾的导入(import)，将 SVG 声明(declare) 为一个新的模块(module)，并将模块的 content 定义为 any。
     * 可以通过将类型定义为字符串，来更加显式地将它声明为一个 url。
     */
    const content: any;
    export default content;
}