# react性能优化
## 代码层优化
### 使用shouldComponentUpdate
[组件的更新(update)阶段-shouldComponentUpdate ](https://github.com/wwlh200/front-end-sharing-every-day/blob/master/react/react%20%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.md#%E4%B8%89%E7%BB%84%E4%BB%B6%E7%9A%84%E6%9B%B4%E6%96%B0update%E9%98%B6%E6%AE%B5)

### React.PureComponent with function/stateless Components
PureComponent主要适用于对状态变化进行浅层比较，相对于Component可以使用shouldComponentUpdate去实现这种效果。使用这两种方法，当组件更新时，如果组件的 props 和 state 都没发生改变， render 方法就不会触发，省去 Virtual DOM 的生成和比对过程，达到提升性能的目的。  
使用PureComponent情况（纯组件或者功能组件）：
- 组件State/Props是一个不可变对象
- State/Props没有多级嵌套对象
- 父组件的props 和 state 不能使用同一个引用
```
class Test extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```
### 使用immutable.js（减少react的重复渲染）
JavaScript 中的对象一般是可变的（Mutable），因为使用了引用赋值，新的对象简单的引用了原始对象，改变新的对象将影响到原始对象。为了解决这个问题，我们使用浅拷贝或者深拷贝来避免对象被修改，但是这样会浪费CPU和内存。而使用immutable可以很好的解决这一切。
- 优点
    - immutable数据对象更好的创建，测试，使用
    - 零副作用
    - 有助于防止时间耦合
    - 更容易跟踪改变
    - 保证state的安全
- 缺点
    - 第三方库的侵入性 
- 应用场景
    - 频繁操作state/store对象
    - 拷贝复杂对象  

详细查看：[github文档](https://github.com/immutable-js/immutable-js)
### 使用React.Fragments避免不必要的标签包装
```
  public render() {
    const [header, content] = [this.renderHeader(), this.renderContent()];
    return (
      <React.Fragment>
        {header}
        {content}
      </React.Fragment>
    );
  }
```
### 避免使用索引作为数组的key值
```
render() {
    const manualTaxes = manualTaxesToArray(this.props.updateManualTaxesData);
    return (
      <div>
        {this.renderErrorMsg()}
        {manualTaxes.map((manualTax: IManualTaxesMap, index: number) => {
          return this.renderCheckbox(manualTax, index);
        })}
      </div>
    );
  }

  renderCheckbox(manualTax: IManualTaxesMap, index: number) {
    return (
      // 错误示例： <div key={index} className="moduleDetail">
      <div key={manualTax.id} className="moduleDetail">
        aaa
      </div>
    );
  }
```
### 避免初始化中给state设置props的数据
```
 constructor(props){
        super(props);
        this.state ={
            name: props.name;
        }
    }
```
### 在JavaScript中限制事件频繁触发
[JavaScript 防抖与节流](https://github.com/wwlh200/front-end-sharing-every-day/blob/master/perfermance/JavaScript%20%E9%98%B2%E6%8A%96%E4%B8%8E%E8%8A%82%E6%B5%81.md#%E6%A6%82%E8%BF%B0)
### 在初始化中绑定函数
```
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }
```
## 工具层面上优化（具体案例后面会继续更新）
### lodash-webpack-plugin
### 代码分割
Reduce JavaScript Payloads with Code Splitting:https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/  
[GWT] Code Splitting:http://www.gwtproject.org/doc/latest/DevGuideCodeSplitting.html  
[Webpack] Code Splitting:https://webpack.js.org/guides/code-splitting/
Async reducer implementation reference: http://nicolasgallagher.com/redux-modules-and-code-splitting/  
Open source solution for universal rendering: https://eng.uber.com/fusionjs/
### SSR服务器渲染
### 延迟加载组件
### 使用ServiceWorkers缓存应用程序状态
### Gzip压缩
### 使用Web Workers处理大批量数据的计算或渲染
### 使用CDN加速