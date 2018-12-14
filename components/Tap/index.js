import React, { Component } from 'react';
class Tap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tapState: true,
            longTapExist: null
        }
    }

    handleTouchStart = (e) => {
        this.state.longTapExist = setTimeout(() => {
            this.state.tapState = false;
            this.props.onLongTap(e);
        },700);
    }

    handleTouchEnd = (e) => {
        if(this.state.longTapExist) {
            clearTimeout(this.state.longTapExist);
        }
        if (this.state.tapState) {
            this.props.onTap && this.props.onTap(e);
        }
        this.state.tapState = true;
    }

    handleTouchMove = () => {
        if(this.state.longTapExist) {
            clearTimeout(this.state.longTapExist);
        }
        this.state.tapState = false;
    }

    handleClick = (e) => {
        this.props.onClick && this.props.onClick(e);
    }

    render() {
        return (
            <div href="javascript: void(0)" className="tap" onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd} onClick={this.handleClick}>
                {this.props.children}
            </div>
        )
    }
}

module.exports = Tap;