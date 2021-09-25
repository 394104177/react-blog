import React, { Component } from 'react'
import "./index.css"
import PropTypes from "prop-types"
export default class index extends Component {
    static propTypes = {
        header: PropTypes.element,
        aside: PropTypes.element,
        children: PropTypes.arrayOf(PropTypes.element)
    }
    render() {
        return (
            <div className="container">
                <header className="header">
                    {this.props.header}
                </header>
                <div className="middle">
                    <aside>
                        {this.props.aside}
                    </aside>
                    <main>
                        {this.props.children}
                    </main>
                </div>
            </div>
        )
    }
}
