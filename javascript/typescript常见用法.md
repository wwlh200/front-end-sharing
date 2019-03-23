# TypeScript常用语法
## 数据类型 
### 常见数据类型
- boolean
- number
- string
- null
- undefined
- Symbol
- void
- any
语法：
```
let name:<type>=<value>;
```
### 数组
- 「类型 + 方括号」表示法
```
let list: number[] = [1, 2, 3];
```
- 数组泛型Array<elemType>
```
let list:Array<string|number>=['1',2,3,'4'];
```
### 元组
数组合并了相同类型的对象（也可以不同类型），而元组（Tuple）合并了不同类型的对象。
当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
```
let data: [string, number] = ['a', 1];
```
当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
### 枚举
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
### 内置对象（可以作为定义好的类型）
- Boolean、Error、Date、RegExp
```
let d: Date = new Date();
```
- Document、HTMLElement、Event、NodeList
```
let body: HTMLElement = document.body;
```
### 字变量类型
字面量类型用来约束取值只能是某几个值中的一个。
```
type EventNames = 'click' | 'scroll' | 'mousemove';

type num = 1 | 2 | 3;
```
类型别名与字符串字面量类型都是使用 type 进行定义。
### 联合类型
联合类型使用 | 分隔每个类型。
语法：
```
let name:<type1>|<type1>=<value>;
```
### 类型断言
可以用来手动指定一个值的类型。
```
<类型>值
或
值 as 类型
```
在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
***
## 函数
在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
### 可选参数
与接口中的可选属性类似，我们用 ? 表示可选的参数（可选参数必须接在必需参数后面）
```
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    } 
}
```
### 重载
重载允许一个函数接受不同数量或类型的参数时
***
## 面向对象
### 接口
#### 概念
- 对类的一部分行为进行抽象
- 对「对象的形状（Shape）」进行描述
#### 可选属性
可选属性的含义是该属性可以不存在。  
语法：
```
interface Person {
    name?: string;
}
```
可以定义方法
### TypeScript 中类的用法
#### public private 和 protected
TypeScript 可以使用三种访问修饰符：public private 和 protected
- public：公有的，任何地方可以访问
- private：私有的，不允许在类的外部访问
- protected：受保护的，在子类可以访问，不允许在类的外部访问
#### 抽象类
abstract 用于定义抽象类和其中的抽象方法。
- 不允许实例化
- 抽象类中的抽象方法必须被子类实现
### 三者直接的关系
- 类实现接口 implements（对类的一部分行为进行抽象）
- 接口继承接口
- 接口继承类（跟java不一样）
