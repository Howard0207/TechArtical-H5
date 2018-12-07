import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Button from '../components/Button';
import sha256 from 'sha256';
class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: "招银云创",
            loading: false,
            buttonText: '警告信息'
        }
    }

    note = () => alert(this.state.company);
    loading = () => {
        let loading = this.state.loading;
        this.setState({ loading: !loading });
    }

    changeButtonText = () => {
        let index = ~~(Math.random() * 5);
        let arrText = ['警告信息', '提示信息', '注册', '登录', '提交'];
        console.log(index);
        this.setState({ buttonText: arrText[index] })
    }

    request = () => {
        Axios.get('/user', {
            params: {
                ID: 12345
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });
    }

    requestToken = () => {
        Axios.post('/test/getToken', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function (response) {
                console.log(sha256('hello'))
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    Ajax = (url, data, method, success) => {
        // 异步对象
        var ajax = null;
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject('Microsoft.XMLHTTP')
        }
        var method = method.toUpperCase()
        // get 跟post  需要分别写不同的代码
        if (method == 'GET') {
            // get请求
            if (data) {
                // 如果有值
                url += '?';
                url += data;
            } else {

            }
            // 设置 方法 以及 url
            ajax.open(method, url);

            // send即可
            ajax.send();
        } else if (method == 'POST') {
            // post请求
            // post请求 url 是不需要改变
            ajax.open(method, url);

            // 需要设置请求报文
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            // 判断data send发送数据
            if (data) {
                // 如果有值 从send发送
                ajax.send(data);
            } else {
                // 木有值 直接发送即可
                ajax.send();
            }
        }

        // 注册事件
        ajax.onreadystatechange = function () {
            // 在事件中 获取数据 并修改界面显示
            if (ajax.readyState == 4 && ajax.status == 200) {
                // console.log(ajax.responseText);

                // 将 数据 让 外面可以使用
                // return ajax.responseText;

                // 当 onreadystatechange 调用时 说明 数据回来了
                // ajax.responseText;

                // 如果说 外面可以传入一个 function 作为参数 success
                success(ajax.responseText);
            }
        }

    }

    testAjax = () => {
        this.Ajax('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        }, 'GET', function (res) {
            console.log(res);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.testAjax}>Click</button>
                <Button type={'normal'} onClick={this.requestToken}>这是按钮</Button>
                <Button type={'normal'} icon={`info-circle`} onClick={this.changeButtonText}>{this.state.buttonText}</Button>
                <Button type={'normal'} loading={this.state.loading} onClick={this.loading}>加载中</Button>
            </div>
        )
    }

}
Test.propTypes = {
    name: PropTypes.string
}

export default Test;