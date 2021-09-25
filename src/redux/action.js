export const action =  {
    DECREASE:Symbol("decrease"),
    INCREASE:Symbol("increase"),
    SET:Symbol("set"),
    ASYNCINCREASE:Symbol("async-increase"),
    ASYNCDECREASE:Symbol("async-decrease")
}


export const decreaseAction = function(){
    return {
        type:action.DECREASE
    } 
}
export const increaseAction = function(){
    return {
        type:action.INCREASE
    } 
}

export const asyncDecreaseAction = function(){
    
    return {
        type:action.ASYNCDECREASE
    } 
}
export const asyncIncreaseAction = function(){
    return {
        type:action.ASYNCINCREASE
    } 
}

export const setAction =function(payload){
    return {
        type:action.SET,
        payload:payload
    }
}