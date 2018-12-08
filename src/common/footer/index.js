import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <NavLink to="/news" activeClassName="active">资讯</NavLink>
                <NavLink to="/discovery" activeClassName="active">发现</NavLink>
                <NavLink to="/personal" activeClassName="active">我的</NavLink>
            </div>
        )
    }
}

export default Footer;