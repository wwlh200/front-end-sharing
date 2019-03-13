# react高阶组件(高阶组件就是一个没有副作用的纯函数。可以解耦)
高阶组件（HOC）是react中的高级技术，用来重用组件逻辑。高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。主要是取代mixins去解决横切关注点（将组件里面的方法抽出来，类似Spring AOP）
## react mixins的缺点
- Mixins容易被破坏
- Mixins会引入隐式的依赖,可能依赖其他minxins或者命名冲突，导致高度耦合
- Mixins会引起滚雪球式的复杂性。Mixin开始很简单，但是会日益复杂。
## 使用详细
- high order component
```
import * as React from 'react';

interface IPosition {
  position: string;
}

// tslint:disable-next-line:no-any
const InfoTooltip = (WrapComponent: any) =>
 class extends React.Component<IPosition> {
   constructor(props: IPosition) {
     super(props);
   }
   // ...some codes
   render() {
     return (
      <div className="info-tip">
        <span>{this.props.position}</span>
        <WrapComponent />
      </div >
     );
   }
 };

export default InfoTooltip;
```
- use WrappedComponent
```
import * as React from 'react';
import { LocalTranslate } from '../../i18n/LocalTranslate';
import InfoTooltip from './InfoTooltip';

export class TaxIdTipContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        // ... some codes
      </React.Fragment>
    );
  }
}
// usage
export default InfoTooltip(TaxIdTipContent);
```
- use this component and transfer props
```
// ...some codes
import TaxIdTipContent from '../common/TaxIdTipContent';
// ...some codes
export default class TaxId extends React.Component<ITaxIdProps> {
  public static defaultProps: Partial<ITaxIdProps> = {};

  constructor(props: ITaxIdProps) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        // usage
        <TaxIdTipContent position="tc"/>
      </React.Fragment>
    );
  }
}

```
## 注意事项
- 不要改变原始组件，使用组合  
高阶组件应该使用组合技术，将输入组件包裹到一个容器组件中：
```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // 用容器包裹输入组件，不要修改它，漂亮！
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
可以认为高阶组件就是参数化的容器组件定义。
- 约定：贯穿传递不相关props属性给被包裹的组件  
```
render() {
  // 过滤掉专用于这个阶组件的props属性，
  // 不应该被贯穿传递
  const { extraProp, ...passThroughProps } = this.props;

  // 向被包裹的组件注入props属性，这些一般都是状态值或
  // 实例方法
  const injectedProp = someStateOrInstanceMethod;

  // 向被包裹的组件传递props属性
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```
简单来说：过滤掉不需要的props
- 约定：最大化的组合性
- 约定：包装显示名字以便于调试
- 不要在render方法内使用高阶组件
```
// 错误实例
import * as React from 'react';
import { LocalTranslate } from '../../i18n/LocalTranslate';
import InfoTooltip from './InfoTooltip';

export class TaxIdTip extends React.Component {
  render() {
    const Component=InfoTooltip(TaxIdTipContent);
    return (
      <React.Fragment>
        // ... some codes
        <Component />
      </React.Fragment>
    );
  }
}
// usage
export default TaxIdTip;
```
```
- 必须将静态方法做拷贝
- Refs属性不能贯穿传递