vue手记
====
---
## vue 指令
> 指令是带有 V- 前缀的特殊属性。用于在表达式的值发生改变时，将摩羯行为应用到DOM上


* v-html ==> 用于输出html代码
* v-if  ==> 用于判断是否插入元素
* v-bind:class ==> 用于动态的切换class
* v-on  ==> 用于事件的监听
* 


## computed与methods区别
* computed是基于它的依赖缓存的,只有相关依赖发生改变的时候才会重新取值。而使用mothods,在重新渲染的时候,函数总会重新调用执行
* 可以说使用 computed 性能会更好，但是如果你不希望缓存，你可以使用 methods 属性。

## v-on提供了时间修饰符来处理
* v-on提供了时间修饰符来处理DOM事件细节,通过 `.` 指令后缀来调用修饰符
* 阻止单击事件冒泡 `<a v-on:click.stop="doThis></a>"`
* 提交事件不在重载页面 `<form v-on:submit.prevent="onSubmit></form>"`
* 修饰符是可以串联的 `<a v-on:click.stop.prevent="doThat"></a>`
* 可以只有修饰符 `<form v-on:submit.prevent></form>`
* 添加事件监听器时使用时间捕获模式 `<div v-on:click.capture="doThis">...</div>`
* 只当事件在该元素本身（而不是子元素）触发时触发回调 `<div v-on:click.self="doThat">...</div>`
* click 事件只能点击一次，2.1.4版本新增 `<a v-on:click.once="doThis"></a>`