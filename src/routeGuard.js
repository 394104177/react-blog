import { Component } from 'react'
import { withRouter } from "react-router-dom"
class routeGuard extends Component {
    componentDidMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            if (this.props.onChange) {
                const prevLocation = this.props.location
                this.props.onChange(prevLocation, location, action, this.unlisten)
            }
        })

        // this.props.history.block("不阻止")
    }
    componentWillUnmount() {
        this.unlisten()
    }
    render() {
        return this.props.children
    }
}

export default withRouter(routeGuard)