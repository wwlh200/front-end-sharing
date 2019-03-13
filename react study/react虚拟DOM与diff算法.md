# Virtual Dom
## 什么是虚拟dom
- 官方概念：虚拟DOM（VDOM）是一种编程概念，是指虚拟的视图被保存在内存中，并通过诸如ReactDOM这样的库与“真实”的DOM保持同步。这个过程被称为和解。
- 简单来说：实际上就是用JS对象模拟页面上的DOM和DOM嵌套，这也是react高性能的原因
- 虚拟dom具有批处理和高效的Diff算法，只需要对页面的改动做渲染，而不用重新渲染整个页面
![image](http://wheeler-front-end.oss-cn-beijing.aliyuncs.com/Virtual-DOM.png)
## react实现
- 当Node节点的更新，虚拟DOM会比较两棵DOM树的区别，保证最小化的DOM操作，使得执行效率得到保证。
- 计算两棵树的常规算法是O(n^3)级别，所以需要优化深度遍历的算法。React diff算法的时间复杂度为O(n)。
![image](http://wheeler-front-end.oss-cn-beijing.aliyuncs.com/diff.png)