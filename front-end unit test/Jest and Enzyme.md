# Front-end Unit Test with Jest and Enzyme
- [Jest and Enzyme Introduction](#jest-and-enzyme-introduction)
- [Compare Jest & Enzyme](#compare-jest--enzyme)
- [Enzyme - Compare Shallow, Render and Mount](#enzyme---compare-shallow-render-and-mount)
- [NOCK](#nock)
- [Packages Related to Unit Test](#packages-related-to-unit-test)
- [Jest Configuration and Common methods](#jest-configuration-and-common-methods)
- [Mock Functions/Modules](#mock-functionsmodules)
- [Error and Solution](#error-and-solution)
----
## Jest and Enzyme Introduction
[Unit Test with Jest & Enzyme](http://wheeler-front-end.oss-cn-beijing.aliyuncs.com/Unit%20Test%20with%20Jest%20%26%20Enzyme.pptx)
## Compare Jest & Enzyme
### Reference URLs
#### Jest
```
https://facebook.github.io/jest/

https://facebook.github.io/jest/docs/en/api.html

https://facebook.github.io/jest/docs/en/getting-started.html
```
#### Enzyme
```
https://github.com/airbnb/enzyme

http://airbnb.io/enzyme/docs/api/
```
### Introduction
#### Jest
- A JavaScript unit testing framework, used by Facebook to test services and React applications.
- It comes with a test runner, assertion library, and good mocking support.
- Jest is built on top of Jasmine.
- Jest has a novel way to test react components: Snapshot testing. With snapshot testing, the output of the current test run is compared with the snapshot of the previous test run. If the output matches the snapshot, the test passes.
#### Enzyme
- A JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output.
- A library that wraps packages like React TestUtils, JSDOM and CheerIO to create a simpler interface for writing unit tests. 
- React TestUtils has methods to render a react component into a document and simulate an event.
- JSDOM is a JavaScript implementation of the DOM (Document object model). DOM represents the tree structure of UI components.
- CheerIO implements a subset of jQuery core and is used to query the DOM.
### Packages
#### Jest
```
jest
babel-jest
react-test-renderer: It renders the component to JSON
jest-cli
```
#### Enzyme
```
enzyme
enzyme-adapter-react-16
enzyme-to-json
```
### APIs
#### Jest
```
describe: defines a test suite.
jest.fn(): creates a mock function.
expect: makes an assertion.
beforeEach: defines an entry hook before running each test.
it: defines a test.
beforeEach, afterEach
beforeAll, afterAll
```
#### Enzyme
```
find: accepts a selector and retrieves nodes that match the selector. It accepts jQuery-like selectors to retrieve a node from the DOM tree.
findWhere: retrieve nodes selected by the predicate.
some: returns true if there is at-least one node matching the selector.
someWhere: returns true if there is at-least one node selected by the predicate.
first: returns the first node of a set.
at: returns the nth node of a set.
html: gets the HTML of the node.
text: gets the text representation of the node.
simulate: simulates an event, it is useful to simulate user actions.
setProps: sets the props.
setState: sets the state.
setContext: sets the context.
prop(key): retrieves prop value corresponding to the provided key.
state(key): retrieves state corresponding to the provided key.
context(key): retrieves context value corresponding to the provided key.
```
### Execute Test
#### Jest
jest  
jest --coverage  
jest --updateSnapshot, -u            Use this flag to re-record snapshots.   
Cmd in our project: (npm test, npm test – -u)  
- On running the test, a snapshot file is created within the __snapshots__ folder. The snapshot for our component is shown below.
- Snapshot testing is another new idea from Facebook. It provides an alternate way to write tests without any assertions.
#### Enzyme
N/A
## Enzyme - Compare Shallow, Render and Mount
### Introduction
#### Shallow
- Does a shallow rendering to the DOM.
- No children rendering. Only render the component under test and dependent/nested components are not rendered.
- Shallow rendering is used to isolate the component for unit testing.
- Isolated, you know for sure the error comes from here
- Pass the event arguments along with the simulated event. Without passing any event arguments, the test will fail.
- Props on the component cannot be tested. The call to ShallowWrapper.props().propName will return undefined .
#### Render
renders the component as static HTML.
- No lifecycles
- Render children
- Less APIs (setState, debug...)
#### Mount
- Full rendering including child components. Mounts the full component in JSDOM. Full rendering using the mount function and HTML rendering using the render function. 
- Requires a DOM (jsdom, domino).
- Lifecycle methods, like componentDidMount
- More costly in execution time.
### When should use
#### Shallow
for Shallow rendering is useful to constrain yourself to **testing a component as a unit**, and to ensure that your tests aren't indirectly asserting on behavior of child components.  
Real unit test (isolation, no children render)
- Simple shallow-Calls:
    - constructor
    - render
- Shallow + setProps-Calls:
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
    - render
- Shallow + unmount-Calls:
    - componentWillUnmount
#### Render
which is used to render react components to static HTML and **analyze the resulting HTML** structure.  
only calls render but renders all children.
#### Mount
for Full DOM rendering is ideal for use cases where you have components that may **interact with DOM apis, or may require the full lifecycle in order to fully test the component (ie, componentDidMount etc.)**  
The only way to test componentDidMount and componentDidUpdate. Full rendering including child components. Requires a DOM (jsdom, domino). More constly in execution time. If react is included before JSDOM, it can require some tricks:  
require('fbjs/lib/ExecutionEnvironment').canUseDOM = true;
- Simple mount-Calls:
    - constructor
    - render
    - componentDidMount
- Mount + setProps-Calls:
    - componentWillReceiveProps
    - shouldComponentUpdate
    - componentWillUpdate
    - render
    - componentDidUpdate
- Mount + unmount-Calls:
    - componentWillUnmount
### toMatchSnapshot
Shallow Render Shallow are all supported
### simulate
Shallow Shallow are supported, Render is not supported
### Performance
Shallow>Render>Mount
### summary
- Always begin with shallow
- If componentDidMount or componentDidUpdate should be tested, use mount
- If you want to test component lifecycle and children behavior, use mount
- If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render
## NOCK
HTTP server mocking and expectations library for Node.js  

Nock can be used to test modules that perform HTTP requests in isolation.  

For instance, if a module performs HTTP requests to a CouchDB server or makes HTTP requests to the Amazon API, you can test that module in isolation.  

[https://github.com/nock/nock](https://github.com/nock/nock)
## Packages Related to Unit Test
- babel-polyfill	^6.26.0
- redux-mock-store	^1.4.0
- react-test-renderer	^16.0.0
- jest	^21.2.1
- jest-cli	^21.1.0
- enzyme	^3.1.0
- enzyme-adapter-react-16	^1.0.2
- enzyme-to-json	^3.3.0
- raf	^3.4.0
- identity-obj-proxy	^3.0.0
- isomorphic-fetch	^2.2.1

## Jest Configuration and Common methods
### configuration instruction
[https://jestjs.io/docs/en/configuration](https://jestjs.io/docs/en/configuration)
### Jest.config.js 
[https://github.com/wwlh200/react-shared-lib/blob/master/jest.config.js](https://github.com/wwlh200/react-shared-lib/blob/master/jest.config.js)
### Setup 
[https://github.com/wwlh200/react-shared-lib/blob/master/test/setup.js](https://github.com/wwlh200/react-shared-lib/blob/master/test/setup.js)
### Common Methods
#### methods
```
import React from 'react';
import {mount, shallow, render} from 'enzyme';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
 
export const shallowWithStore = (Component, store) => {
    const context = {
        store,
    };
    return shallow(Component, {context});
};
 
export const mountWithStore = (Component, store) => {
    const context = {
        store,
    };
    return mount(Component, {context});
};
 
export const shallowWithState = (Component, state) => {
    const context = {
        store: {
            getState: () => state,
            subscribe: () => ({}),
            dispatch: () => ({}),
        },
    };
    return shallow(Component, {context});
};
 
export const mountWithState = (Component, state) => {
    const context = {
        store: {
            getState: () => state,
            subscribe: () => ({}),
            dispatch: () => ({}),
        },
    };
    return mount(Component, {context});
};
 
export const mountWithProvider = (Component, store) => {
    return mount(
        <Provider store={store}>
            {Component}
        </Provider>
    );
};
 
export const mountWithProviderRouter = (Component, store, route=null) => {
    if(route) {
        return mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]} keyLength={0}>
                    {Component}
                </MemoryRouter>
            </Provider>
        );
    } else {
        return mount(
            <Provider store={store}>
                <MemoryRouter>
                    {Component}
                </MemoryRouter>
            </Provider>
        );
    }
};
 
export const renderWithProviderRouter = (Component, store, route=null) => {
    if(route) {
        return render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]} keyLength={0}>
                    {Component}
                </MemoryRouter>
            </Provider>
        );
    } else {
        return render(
            <Provider store={store}>
                <MemoryRouter>
                    {Component}
                </MemoryRouter>
            </Provider>
        );
    }
};
```
#### MockStore
```
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
 
const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);
 
export default mockStore;
```
## Mock Functions/Modules
- Mock function and mock return values. 
```
import {moduleFunc} from '../utils/common'

jest.mock('../utils/common', () => ({
    moduleFunc: jest.fn()
}));
moduleFunc.mockReturnValue(true);
```
- Mock history with push method
```
history: {push: jest.fn()}
```
- Mock document (document.getElementById...)
```
document.getElementsByName = () => {
    return ([
        {value: 1342134}
    ]);
};
```
- Mock dispatch with then	
```
const mockDispatch = ()=> {
    return new Promise(function (resolve, reject) {
        resolve('Success!');
    }).then((function (value) {
    }))
};
```
## Error and Solution
### 1.Enzyme Internal Error
#### Errors
Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`  

before using any of Enzyme's top level APIs, where `Adapter` is the adapter corresponding to the library currently being tested. For example:  

`import Adapter from 'enzyme-adapter-react-15'`;  

To find out more about this, see http://airbnb.io/enzyme/docs/installation/index.html
#### Cause
Enzyme-adapter-react is not configured.
#### Solution
```
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
configure({ adapter: new Adapter() });
```
### 2.Could not locate module
#### Errors
Could not locate module ./Validation/style.css (mapped as identity-obj-proxy)
#### Cause
The package is not installed.
#### Solution
`npm install <package> --save-env`  
Add the item to package.json: "identity-obj-proxy": "^3.0.0" then execute npm install.
### 3.TypeError
#### Errors
TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string
#### Cause
Jest and jest-cli package issue with version 20, so upgrade their version to 21.
#### Solution
`"jest": "^21.2.1",
"jest-cli": "^21.1.0", 
`
### 4.Invariant Violation store
#### Errors
Invariant Violation: Could not find "store" in either the context or props of "Connect(SuccessPopup)". Either wrap the root component in a <Provider>, or explicitly pass "store" as a prop to "Connect(SuccessPopup)".	
#### Cause
The store is not defined and pass to the component.	
#### Solution
```
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middleware = [ thunk ];
const mockStore = configureMockStore(middleware);
 

const store = mockStore({

    moduleState: {
        properties: {
            data:'test'
  }
        }
    }
});
const component = mount(

<Provider store={store}>

 <ButtonMenu {...props} />
</Provider>);
```
### 5.Invariant Violation router
#### Errors
Invariant Violation: You should not use <Route> or withRouter() outside a <Router>
#### Cause
Didn't pass router to the component.
#### Solution
```
import {MemoryRouter} from 'react-router-dom';
component = render(
    <Provider store={store}>
 <MemoryRouter>
 <ButtonMenu {...props} />
 </MemoryRouter>
 </Provider>);

expect(shallowToJson(component)).toMatchSnapshot();
```
### 6.TypeError Action
#### Errors
TypeError: (0 , _Actions.getModule) is not a function

if there hava connect,dispatch and then,we can't mock dispatch,so we must mock Action
#### Cause
the dispatch can't be mock	
#### Solution
```
jest.mock('../react/actions/Actions', () => ({
    getModule: () => {
        return () => {
            return new Promise((resolve, reject) => {
                resolve('Success!');
 }).then(((value) => {
            }))
        };
 }
}));
```
### 7.TypeError then
#### Errors
TypeError: Cannot read property 'then' of undefined  

if there hava dispatch and then,we can mock dispatch
#### Cause
the then must be mock
#### Solution
```
const props = {
    dispatch: ()=> {
        return new Promise(function (resolve, reject) {
            resolve('Success!');
 }).then((function (value) {
        }))
    },
};
 
const component = mountWithState(<moduleComponent {...props} />);
```
### 8.TypeError this.props.history.push
#### Errors
 TypeError: this.props.history.push is not a function	
#### Cause
the history must be mock
#### Solution
```
import createHistory from 'history/createHashHistory';
const props = {
 history: createHistory()
};
```
### 9.TypeError window.location.origin 
#### Errors
TypeError: Could not parse "null/lodging/prodcreation/edit.html?htid=null&roomTypeKey=12287-13402753&ratePlanKey=207005852-13402754&trace=on&action=Reactivate" as a URL
#### Cause
window.location.origin is null
#### Solution
In jest.config.js

`"testURL": 'https://test.com?roomTypeKey=12287-12287&errorType=24&trace=32&ratePlanId=12287
&pmAction=RATE_PLAN_ADD&errorCode=sasa&pageName=sasa&encode=%e4%b8%ad%e6%96%87',`
### 10.TypeError Object.values is not a function
#### Errors
TypeError: Object.values is not a function  
if you have a problem like this, Object.values or Array.values is not available
#### Cause
Object.values is a new feature in ES2017. It is very bleeding edge. Node.js has full support for it from version 7.0.	
#### Solution
polyfill it using babel-polyfill (via import 'babel-polyfill' in setupTests.js file).




