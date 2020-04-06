# react 路由
## bundle-loader实现路由按需加载
Bundle.js
```
import { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {
    constructor() {
        super();
        this.state = {
            // short for "module" but that's a keyword in js, so "mod"
            mod: null
        };
    }

    componentWillMount() {
        this.load(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps);
        }
    }

    load(props) {
        this.setState({
            mod: null
        });
        props.load((mod) => {
                this.setState({
                // handle both es imports and cjs
                mod: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null;
    }
}

Bundle.propTypes = {
    load: PropTypes.func,
    mod: PropTypes.object,
    children: PropTypes.func
};

export default Bundle;
```
App.jsx
```
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Store from './store/Store';
import Bundle from './utils/Bundle';
import loadComponent1 from 'bundle-loader?lazy!./components/Component1';
import loadComponent2 from 'bundle-loader?lazy!./components/Component2';
import loadComponent3 from 'bundle-loader?lazy!./components/Component3';

const Component1 = (props) => (
    <Bundle load={loadComponent1}>
        {(Component1) => <Component1 {...props}/>}
    </Bundle>
);

const Component2 = (props) => (
    <Bundle load={loadComponent2}>
        {(Component2) => <Component2 {...props}/>}
    </Bundle>
);

const Component3 = (props) => (
    <Bundle load={loadComponent3}>
        {(Component3) => <Component3 {...props}/>}
    </Bundle>
);

const RouterSwitch = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path={ '/test/Component1'} component={ Component1 } />
                <Route exact path={ '/test/Component2'} component={ Component2 } />
                <Route exact path={ '/test/Component3'} component={ Component3 } />
            </Switch>
        </div>
    </Router>
);

render(
    <Provider store={ Store }>
        <RouterSwitch/>
    </Provider>,
    document.getElementById('content')
);
```
## 使用import()实现按需加载
```
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Store from './store/Store';


// 按需加载component
const asyncComponent = (getComponent) => {
    return class AsyncComponent extends React.Component {
        static Component = null;
        state = { Component: AsyncComponent.Component };

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(({ default: Component }) => {
                    AsyncComponent.Component = Component
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

const load = (component) => {
    return import(`$conponents/${component}/`)
}

const Component1 = asyncComponent(() => load('Component1'));
const Component2 = asyncComponent(() => load('Component2'));
const Component3 = asyncComponent(() => load('Component3'));

const RouterSwitch = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path={'/test/Component1'} component={Component1} />
                <Route exact path={'/test/Component2'} component={Component2} />
                <Route exact path={'/test/Component3'} component={Component3} />
            </Switch>
        </div>
    </Router>
);

render(
    <Provider store={Store}>
        <RouterSwitch />
    </Provider>,
    document.getElementById('content')
);
```
