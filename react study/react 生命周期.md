
# 生命周期
## 一、组件初始化(initialization)阶段
- constructor
  1. super(props)  
  2. 初始化局部状态，通过赋值一个对象到this.state
  3. 绑定事件处理器方法到一个实例。  

用来做初始化工作
## 二、组件的挂载(Mounting)阶段
- ~~componentWillMount~~  
在组件挂载到DOM前调用一次，在这边调用this.setState不会引起组件重新渲染，可以把写在这边的内容提前到constructor()中，所以项目中很少用。
- render  
组件的props和state（值变化会引起重新render）,return一个react元素（描述组件，UI）
- componentDidMount  
组件挂载到DOM后调用一次，通常用于请求异步数据
## 三、组件的更新(update)阶段
state的改变（setState）或父组件接受的props发生变化时，会导致组件重渲染  
性能优化：setState参数无变化，父组件接受的props无变化，避免冗余操作，提升性能
- ~~componentWillReceiveProps~~  将props转换成自己的state  
在该函数(componentWillReceiveProps)中调用 this.setState() 将不会引起第二次渲染。
父组件接受的props发生变化
- shouldComponentUpdate(nextProps, nextState) 性能优化
```
// 简单数据
shouldComponentUpdate(nextProps, nextState){
  if (nextProps.xx == this.props.xx) {
    return false
  }
  if (nextState.xx == this.state.xx) {
    return false
  }
  return true
}
// 复杂数据
ES6的扩展语法Object.assign()
深拷贝／浅拷贝或利用JSON.parse(JSON.stringify(data))
immutable.js使得内存消耗最低
```
前后不改变state值的setState（理论上）和无数据交换的父组件的重渲染都会导致组件的重渲染，但你可以在shouldComponentUpdate这道两者必经的关口阻止这种浪费性能的行为
- ~~componentWillUpdate~~  
此方法在调用render方法前执行，在这边可执行一些组件更新发生前的工作，一般较少用。
- render
- getSnapshotBeforeUpdate()  
getSnapshotBeforeUpdate()在最新的渲染输出提交给DOM前将会立即调用。它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给componentDidUpdate()。
**支持异步渲染**
- componentDidUpdate(prevProps, prevState)  
此方法在组件更新后被调用，可以操作组件更新的DOM，prevProps和prevState这两个参数指的是组件更新前的props和state  
必须在有条件限制的情况下，才能调用setState(),否则无限循环  
可以在此请求后端数据
## 四、卸载阶段
- componentWillUnmount  
此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清楚componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏。
- componentDidCatch()
 React 16 将提供一个内置函数 componentDidCatch，如果 render() 函数抛出错误，则会触发该函数。
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
可以把这个组件封装下成为
```
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```