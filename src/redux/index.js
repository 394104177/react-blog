import { createStore, bindActionCreators, applyMiddleware } from "redux"
import * as Action from "./action"
import logger from "redux-logger"
// import thunk from "redux-thunk"
import saga from "redux-saga"
import sagatask from '../saga'
// import {getAllStudents} from "../services/student"
export function reducer(state = 5, action) {

    switch (action.type) {
        case Action.action.DECREASE:
            return state - 1
        case Action.action.INCREASE:
            return state + 1
        case Action.action.SET:
            return state + action.payload
        default:
            return state
    }

}
let sagarun = saga()
const store = createStore(reducer, applyMiddleware(sagarun, logger))


//得到的新对象，新对象的属性名和第一个参数的属性名是一致的
const newObj = bindActionCreators({
  ...Action

}, store.dispatch)

console.log(newObj)



sagarun.run(sagatask)



//以下等效
newObj.increaseAction()
store.dispatch(Action.asyncDecreaseAction())

// store.dispatch(Action.setAction(10))


// getAllStudents().then(res=>{console.log(res)})


