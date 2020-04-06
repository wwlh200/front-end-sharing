## ECMAScript类型定义
- 基本类型
    - Number
    - String
    - Boolean
    - Null
    - Undefined
    - Symbol
- 引用类型
    - Object
## typeof  运算符
```
// 基本类型
typeof 520 // "number"
typeof "520" // "string"
typeof true // "boolean"
typeof null; // "object" 特别注意 
typeof undefined // "undefined"
typeof Symbol() // symbol
// 引用类型
typeof {} // "object"
typeof function(){} // "function"
typeof new Function() // "function"
typeof new Date() // "object" 特别注意
typeof new RegExp() // "object" 特别注意
```
总结来说：
- 基本类型，需要注意null返回object，其他都返回对应类型
- 引用类型，除了function，都返回object
## instanceof 运算符
instanceof运算符判断一个对象是否是某种类型的实例。所谓的“类型”是构造函数。不适用与基本类型的判断
### 实现原理
```
// 实现原理
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式 

    var O = R.prototype;   // 取 R 的显示原型 

    L = L.__proto__;  // 取 L 的隐式原型

    while (true) {    

        if (L === null)      

             return false;   

        if (O === L)  // 当 O 显式原型 严格等于  L隐式原型 时，返回true

             return true;   

        L = L.__proto__;  

    }
}

// 使用说明
a instanceof A
// 检测a的原型链（__proto__）上是否有A.prototype，若有返回true，否则false
```
### 使用案例
```
// 基本使用
{} instanceof Object // true
function(){} instanceof Function // true
new Function() instanceof Function // true
new Date() instanceof Date // true
new RegExp() instanceof RegExp // true

// instanceof 常规用法-判断 f 是否是 F 类的实例
function F(){} 
var f = new F(); 
console.log(f instanceof F)//true

// instanceof 在继承中关系中的用法
// 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
function A(){} 
function F(){} 
F.prototype = new A(); // Js 原型继承
 
var f = new F(); 
console.log(f instanceof F)//true 
console.log(f instanceof A)//true
```

## Object.prototype.toString.call()方法
- 使用.toString()方法是因为每个从Object原型继承的对象都继承Object.prototype  
- 我们可以使用.call()来改变this上下文（因为它将其参数转换为类型的值）
- 使用.call(/test/i)（正则表达式）则[object Object]变为[object RegExp]
```
// 基本类型
Object.prototype.toString.call(520); // [object Number]
Object.prototype.toString.call("520"); // [object String]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(Symbol()); // [object Symbol]
// 引用类型
Object.prototype.toString.call(function(){}); // [object Function]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
```
### 方法封装
```
function isType(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1)
}
function isNumber(obj) {
    return isType(obj)==='Number'
}
function isString(obj) {
    return isType(obj)==='String'
}
function isBoolean(obj) {
    return isType(obj)==='Boolean'
}
function isNull(obj) {
    return isType(obj)==='Null'
}
function isUndefined(obj) {
    return isType(obj)==='Undefined'
}
function isSymbol(obj) {
    return isType(obj)==='Symbol'
}
function isFunction(obj) {
    return isType(obj)==='Function'
}
function isDate(obj) {
    return isType(obj)==='Date'
}
function isRegExp(obj) {
    return isType(obj)==='RegExp'
}
```
## 使用typescrpt时，@types/node中包含各种类型的检查
`npm install --save @types/node`
## 总结
- typeof:一些简单的可以直接用typeOf去判断，注意null和引用类型
- instanceof:判断引用类型和实例，不能判断基本类型
- Object.prototype.toString.call()：最准确的判断方法，封装一下
- @types/node:引入这个包@types/node，包含各种类型的判断