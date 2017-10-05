angularjs-[layate](http://www.layui.com/laydate/) 日期组件
==================
## 安装
``` 
npm install angularjs-laydate --save
```

## 使用
#### 添加模块依赖
```js
import laydate from 'angularjs-laydate';
angular.module('app', [
  laydate
 ]);
```
#### html页面中使用
```html
// 基本用法
<input type='text' ng-model="laydate" readonly ng-laydate='yyyy-MM-dd HH:mm:ss'/>

// 控制最大时间最小时间
<input type='text' ng-model='minDate' readonly ng-laydate='yyyy-MM-dd HH:mm:ss' max-date='maxDate'/>
<input type='text' ng-model="maxDate" readonly ng-laydate='yyyy-MM-dd HH:mm:ss' min-date="minDate"/>
```
#### 事件
```js
$scope.layConfig = {
    change:()=>{
        console.log('选中触发的事件回调！')
    },
    sure:()=>{
        console.log('确认触发的事件回调！')
    }
}
```
```html
<input type='text' ng-model="laydate" readonly ng-laydate='yyyy-MM-dd HH:mm:ss' lay-config="layConfig"/>
```