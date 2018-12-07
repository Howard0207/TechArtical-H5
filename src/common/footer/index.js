import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="footer">
                <Link to="/">资讯</Link>
                <Link to="/">发现</Link>
                <Link to="/">我的</Link>
            </div>
        )
    }
}

export default Footer;