# 概述
解决性能问题通常会在JavaScript应用程序中出现。防抖和节流能够控制调用函数的速率。在那些频繁操作的模块中，可以使用防抖与节流去提高js的性能，防止用户瘫痪你的应用程序。
- 窗口大小改变resize
- 滚动条scroll
- mousemove
- 提交按钮
- 输入框输入-redux监听数据
- api调用
## 防抖
当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。  
例子：比如打游戏，每坚持5s获得一次积分，如果没坚持到5s就死了，则重新计时
```
const throttle = (fn, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    fn(...args);
  };
};
```
## 节流
当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
例子：例如现在的闹钟的稍后提醒，你可以设置时间，每隔几分钟就会重新响一次
```
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    },                 delay);
  };
};

export { throttle, debounce };
```
