## JavaScript 执行过程
![js执行过程](https://wheeler-front-end.oss-cn-beijing.aliyuncs.com/js%E6%89%A7%E8%A1%8C%E8%BF%87%E7%A8%8B.jpg
)
总结：
- 执行js脚本，分析同步任务和异步任务，先执行同步任务，再执行异步任务
- 分析异步任务中宏任务和微任务，按照图示的异步任务顺序去执行

## 实例
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function (resolve, reject) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

function sleep(duration) {
    return new Promise(function (resolve, reject) {
        console.log("sleep1");
        setTimeout(resolve, duration);
    })
}

sleep(5000).then(()=>console.log("sleep2"));

console.log('script end');

// script start
// async1 start
// async2
// promise1
// sleep1
// script end
// async1 end
// promise2
// setTimeout
// sleep2
```
如何分析这段代码的执行过程？
1. 分析出同步任务：  
script start=>async1 start=>async2=>promise1=>sleep1=>script end
2. 分析出异步任务
    - 分析微观任务
async1 end=>promise2(sleep2也是微观任务，但是包含在宏观任务里面,应在setTimeout后)
    - 分析宏观任务
setTimeout