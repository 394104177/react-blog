import {Avatar,Divider, Icon} from 'antd'

const Author = ()=>{

    return (
        <div className="author-div comm-box">
            <div><Avatar size={100} src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=565918886,1827341957&fm=26&gp=0.jpg" /></div>
            <div className="author-instrduction">
                一个正在找工作的前端菜鸟
                <Divider>个人博客</Divider>
                <Avatar size={28} icon="github" className="account"></Avatar>
                <Avatar size={28} icon="qq" className="account"></Avatar>
                <Avatar size={28} icon="wechat" className="account"></Avatar>
            </div>
        </div>
    )
}

export default Author