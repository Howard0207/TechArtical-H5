import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

class News extends Component{
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    componentDidMount = () => {
        axios.post('/test/user/getTestData', {
            firstName: 'Fred',
            lastName: 'Flintstone'
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
          <div className="news">
              资讯中心
          </div>
        )
    }
}

News.propTypes = {
    name: PropTypes.string
}

module.exports = News;