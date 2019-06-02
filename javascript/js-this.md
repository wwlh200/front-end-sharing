# this
掌握this在不同场景中的使用。注意：this既不指向函数本身，也不指向函数的词法作用域，实际是在函数调用的时候才发生的bind,this的指向取决于函数的调用（简单来说：this总是指向调用包含this的方法的对象）
## 单独使用
```
var x = this;
console.log(Object.prototype.toString.call(x)); //[object global]

//严格模式下
"use strict";
var x = this;
console.log(Object.prototype.toString.call(x)); //[object Undefined]

// 在浏览器窗口中，都返回[object Window]
```
非严格模式下，指向global；严格模式下是undefined；浏览器下指向window。
## 在方法中
```
function myFunction() {
    return this;
}
console.log(Object.prototype.toString.call(myFunction())); //[object global]

//严格模式下
"use strict";
function myFunction() {
    return this;
}
console.log(Object.prototype.toString.call(myFunction())); //[object Undefined]

// 在浏览器窗口中，都返回[object Window]
```
## 在对象方法中
```
var person = {
  firstName  : "John",
  lastName   : "Doe",
  id         : 5566,
  myFunction : function() {
    return this;
  }
};
person.myFunction(); // 指向person
```
在对象方法中，this指向方法的所有者Person
## call,apply,bind-改变函数的this对象的指向
### call
```
fun.call(thisArg, arg1, arg2, ...)
```
call：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.call(A, arguments);即A对象应用B对象的方法。
```
function A(name) {
        return 'A'+name;
    }

    function B(name) {
        return 'B'+name;
    }
    console.log(A.call(B,'B')); // AB
```
### apply
```
fun.apply(thisArg, [argsArray])
```
apply：调用一个对象的一个方法，用另一个对象替换当前对象。例如：B.apply(A, arguments);即A对象应用B对象的方法。

```
    function A(name) {
        return 'A'+name;
    }

    function B(name) {
        return 'B'+name;
    }
    console.log(B.apply(A,['A'])); // BA
```
### bind-react目前的函数绑定方式
```
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```
- thisArg 当绑定函数被调用时，该参数会作为原函数运行时的 this 指向。当使用new 操作符调用绑定函数时，该参数无效。
```
    function A(name) {
        return 'A'+name;
    }

    function B(name) {
        return 'B'+name;
    }
    console.log((A.bind(B,'B'))()); // AB
    console.log((B.bind(A,['A']))()); // BA
```
- 调用多次bind创建的函数，它将永久绑定到bind的第一个参数，而不管函数是如何使用的。
```
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind only works once!
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37,37, azerty, azerty
```
### 总结
- call和apply功能一样，只是参数不一样，参数少用call,参数多用apply  
- bind这是固定指向

