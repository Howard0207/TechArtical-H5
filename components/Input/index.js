import React, { Component } from 'react';
import classnames from 'classnames';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value !== '' ? this.props.value : this.props.defaultValue,
            disabled: this.props.disabled ? true : false,
            readOnly: this.props.readOnly ? true : false
        };
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }
    componentDidMount() {
        console.log('Component DID MOUNT!')
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.value
        })
        console.log('Component WILL RECEIVE PROPS!')
    }
    shouldComponentUpdate(newProps, newState) {
        console.log(newProps, newState)
        console.log('Component SHOUlD UPDATE!')
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, nextState)
        console.log('Component WILL UPDATE!');
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
    }
    onChange = (event) => {
        let val = event.target.value;
        this.setValue(val);
        this.props.change && this.props.change(val);
    }
    onFocus = (event) => {
        this.props.onFocus && this.props.onFocus(event)
        console.log('input onFocus!')
    }
    onBlur = (event) => {
        this.props.onBlur && this.props.onBlur(event)
        console.log('input onBlur!')
    }
    // 设置值
    setValue = (value) => {
        this.setState({ value: value });
    }
    // 获取值
    getValue = () => {
        return this.state.value;
    }
    // 只读/可写
    setReadOnly = (value) => {
        if (value) {
            this.setState({ readOnly: true });
        } else {
            this.setState({ readOnly: false });
        }
    }
    // 设置disabled
    setDisabled = (v) => {
        if (v) {
            this.setState({ disabled: true });
        } else {
            this.setState({ disabled: false });
        }
    }
    // 清空值
    clear = () => {
        this.setState({ value: '' });
    }
    render() {
        return (
            <input
                className={classnames('input',this.props.className)}
                value={this.state.value}
                placeholder={this.props.placeholder}
                type={this.props.type}
                onBlur={this.onBlur}
                readOnly={this.state.readOnly}
                onChange={this.onChange}
                onFocus={this.onFocus}
                disabled={this.state.disabled} />
        );
    }
}

Input.defaultProps = {
    value: '',
    placeholder: '',
    type: 'text',
    className: '',
    defaultValue: ''
}

module.exports = Input;
