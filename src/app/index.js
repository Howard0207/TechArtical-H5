import React,{Component} from 'react';
import Header from '../common/header';
import Footer from '../common/footer';
import PropTypes from 'prop-types';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    render() {
        return (
            <div className="app-wrapper">
                <Header />
                <div className="app-content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        )
    }
}

App.propTypes = {
    name: PropTypes.string
}

module.exports = App;