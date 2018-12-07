var React = require('react');
var Input = React.createClass({
    getInitialState: function() {
        return {
            value: this.props.value !== '' ? this.props.value : this.props.defaultValue,
            disabled: this.props.disabled? true : false,
            readOnly: this.props.readOnly? true : false
        };
    },
    getDefaultProps: function() {
        return {
            value: '',
            placeholder:'',
            type: 'text',
            className: '',
            defaultValue: ''
        }
    },
    componentWillMount:function() {
        console.log('Component WILL MOUNT!')
    },
    componentDidMount:function() {
        console.log('Component DID MOUNT!')
    },
    componentWillReceiveProps:function(newProps) {
        this.setState({
            value: newProps.value
        })
        console.log('Component WILL RECEIVE PROPS!')
    },
    shouldComponentUpdate:function(newProps, newState) {
        console.log(newProps,newState)
        console.log('Component SHOUlD UPDATE!')
        return true;
    },
    componentWillUpdate:function(nextProps, nextState) {
        console.log(nextProps,nextState)
        console.log('Component WILL UPDATE!');
    },
    componentDidUpdate:function(prevProps, prevState) {
        console.log('Component DID UPDATE!')
    },
    componentWillUnmount:function() {
        console.log('Component WILL UNMOUNT!')
    },
    onChange(event) {
        var val = event.target.value;
        this.props.change&&this.props.change(val)
    },
    onFocus(event) {
        this.props.onFocus&&this.props.onFocus(event)
        console.log('input onFocus!')
    },
    onBlur(event) {
        this.props.onBlur&&this.props.onBlur(event)
        console.log('input onBlur!')
    },
    // 设置值
    setValue: function (value) {
        this.setState({value: value});
    },
    // 获取值
    getValue: function () {
        return this.state.value;
    },
    // 只读/可写
    setReadOnly: function (value) {
        if (value) {
            this.setState({ readOnly: true });
        } else {
            this.setState({ readOnly: false });
        }
    },
    // 设置disabled
    setDisabled: function (v) {
        if (v) {
            this.setState({ disabled: true });
        } else {
            this.setState({ disabled: false });
        }
    },
    // 清空值
    clear: function () {
        this.setState({value: ''});
    },
    render: function () {
        return (
            <div>
                <input value={this.state.value} placeholder={this.props.placeholder} type={this.props.type} onBlur={this.onBlur} readOnly={this.state.readOnly}
                    onChange={this.onChange} onFocus={this.onFocus} disabled={this.state.disabled}/>
            </div>
        );
    }
});

module.exports= Input;
