import {take,all} from "redux-saga/effects"
import {action} from "../redux/action"
import {increase,decrease} from "../saga/generator"
export default  function * sagatask(){
    console.log('saga启动')
    // 此处run方法中进行对next参数的赋值，值为yield返回值，所以一个普通数据是没意义的，因此要引入指令,指令返回的指令对象，saga会另行处理
    let actions = yield take(action.ASYNCDECREASE)   //take会阻塞,直到dispatch相关action

    let allactions = yield all([increase(),decrease()])   //all也会阻塞,与take功能相同，但可以对多个生成器进行一并控制了
    console.log('action',actions,allactions)
}