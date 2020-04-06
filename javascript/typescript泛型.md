# typescript泛型
泛型指的是在定义函数，接口或类的时候，不预先指定具体的类型，而在使用的过程中去指定类型。使用泛型可以创建泛型函数，泛型接口，泛型类
## 泛型函数
```
function identity<T>(arg: T): T {
    return arg;
}
// 如果编译器不能自动判断出类型，则制动传入
let output = identity<string>("myString"); 
// 类型推论，更支持这种方式，类型推论会帮助我们保持代码精简和高可读性
let output = identity("myString");
```
## 泛型变量
如果函数里面使用了变量的某些特性，则需要指定泛型变量的类型
```
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```
## 泛型类型/泛型接口
```
// 本质上是一样的
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

let myIdentity: <U>(arg: U) => U = identity;

let myIdentity: {<T>(arg: T): T} = identity;
```
泛型接口
```
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```
## 泛型类
```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```
## 泛型约束
主要针对泛型变量中，某些使用了变量的某些特性，我们可以提前约束
```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```