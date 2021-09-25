
let isLogin = localStorage.getItem("openId")
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    isLogin,
    loginIn:function(session){
        localStorage.setItem('openId',session)
        this.isLogin = true
    },
    loginOut:function(){
        localStorage.removeItem('openId');
        this.isLogin = false
    }
}