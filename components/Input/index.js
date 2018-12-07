var React = require('react');
var ReactDOM = require('react-dom');
var Input = require('./Input.js');
var Text = React.createClass({
    getInitialState: function() {
        return {
            text: "默认参数"
        };
    },
    setNewNumber: function() {
        this.setState({data: this.state.data + 1})
    },
    changeState: function(val) {
        this.setState({
            text: val
        });
    },

    getValue: function() {
        var val = this.refs.input1.getValue();
        alert(val);
    },
    setValue: function() {
        var val = this.refs.input1.setValue("设置inputValue");
    },
    clearInfo: function() {
        var val = this.refs.input1.clear();
    },
    setDisabled: function() {
        this.refs.input1.setDisabled(true);
    },
    setAbled: function() {
        this.refs.input1.setDisabled(false);
    },
    setReadOnly: function() {
        this.refs.input1.setReadOnly(true);
    },
    setWriteAble: function() {
        this.refs.input1.setReadOnly();
    },

    render: function () {
        return (
            <div>
                <div>{this.state.text}</div>
                <Input value={this.state.text} placeholder={"默认placeholder"} change={this.changeState} className={'input'} ref="input1"/>
                <Input value={this.state.text} placeholder={"默认placeholder"} change={this.changeState} className={'input'} ref="input2"/>
                <button onClick={this.getValue}>获取值</button>
                <button onClick={this.setValue}>设置值</button>
                <button onClick={this.clearInfo}>清空值</button>
                <button onClick={this.setDisabled}>设置disabled</button>
                <button onClick={this.setAbled}>设置abled</button>
                <button onClick={this.setReadOnly}>设置只读</button>
                <button onClick={this.setWriteAble}>设置可写</button>
            </div>
        );
    }
})

ReactDOM.render( <Text/>, document.getElementById('app') );