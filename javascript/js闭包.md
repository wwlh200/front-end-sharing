## 什么是闭包
闭包是指有权访问另一个函数作用域中的变量的函数。
```
function createFunc() {
    var name = "wheeler";
    return function () {
        return name;
    }
}

var nameFunc = createFunc();  // nameFunc是一个闭包

var name = nameFunc();

console.log(name);

// 解除对匿名函数的应用（以便释放内存）
nameFunc=null;
```
内部函数可以访问外部函数的变量name,内部函数的作用域包含了外部函数的作用域
(由于闭包会携带包含它的函数的作用域，可能导致内存占用过多，因此谨慎使用闭包)
## 可以通过模仿块级作用域减少闭包导致的内存占用过多
```
// 块级作用域（通常称为私有作用域）的匿名函数的语法
(function(){
    // 块级作用域
})();
```

将闭包定义在块级作用域里面
```
// 可以减少闭包占用的内存问题，因为没有指向匿名函数的引用。只要函数执行毕，就可以立即销毁其作用域链了
(function(){
    function createFunc() {
        var name = "wheeler";
        return function () {
            return name;
        }
    }

    var nameFunc = createFunc();

    var name = nameFunc();

    console.log(name);
})();

```
## 闭包的应用场景
- 用闭包模拟私有方法
```
var returnNum = (function () {
    var num = 0;

    function changeNum(value) {
        num = value;
    }

    return {
        add: function () {
            changeNum(10);
        },
        delete: function () {
            changeNum(-10);
        },
        getNum: function () {
            return num;
        }
    }
})();

// 闭包
console.log(returnNum.getNum());
returnNum.add();
console.log(returnNum.getNum());
returnNum.delete();
console.log(returnNum.getNum());
```
- 缓存
```
var CacheCount = (function () {
    var cache = {};
    return {
        getCache: function (key) {
            if (key in cache) {// 如果结果在缓存中
                return cache[key];// 直接返回缓存中的对象
            }
            var newValue = getNewValue(key); // 外部方法，获取缓存
            cache[key] = newValue;// 更新缓存
            return newValue;
        }
    };
})();

console.log(CacheCount.getCache("key1"));
```
- 封装
```
var person = function(){
    var name = "default";//变量作用域为函数内部，外部无法访问
    return {
        getName : function(){
            return name;
        },
        setName : function(newName){
            name = newName;
        }
    }
}();

console.log(person.name);// undefined
console.log(person.getName());
person.setName("wheeler");
console.log(person.getName());
```
- setTimeout
```
function func(param) {
    return function() {
        console.log(param);
    }
}
var myFunc = func('wheeler');
setTimeout(myFunc, 1000);
```
- 保护函数内的变量安全。
- 在内存中维持一个变量。