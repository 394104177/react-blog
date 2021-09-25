const config = {
    user:{
        root:"/user",
        update:"/update",
        pay:{
            root:"/pay",
            afterPay:"/after",
            before:"/before"
        }
    }
}

function setConfig(config){
    _setConfig(config,config.root)
    return config
}

function _setConfig(config,root){
    let baseRoot = ""
    if(root){
        baseRoot =root
      }
    for (const key in config) {
        let item = config[key];
       
        if(key === "root"){
            baseRoot = baseRoot + item
           
        }else if( typeof item === "string"){
          
            config[key] = baseRoot + item
        }else{
            _setConfig(item,baseRoot)
        }
    }
 

  
}
console.log(setConfig(config))
// export default setConfig 