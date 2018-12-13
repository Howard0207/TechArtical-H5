import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';
import Tap from '../Tap';
class Button extends Component {

    render() {
        return (
            <Tap onTap={this.props.onTap} onLongTap={this.props.onLongTap} onClick={this.props.onClick}>
                <button className={classnames('el-button', this.props.type && `el-button--${this.props.type}`, this.props.size && `el-button--${this.props.size}`, {
                    'is-disabled': this.props.disabled,
                    'is-loading': this.props.loading,
                    'is-plain': this.props.plain
                })}
                disabled={this.props.disabled} type={this.props.nativeType}>
                    {this.props.loading && <i className="iconfont icon-sync" />}
                    {this.props.icon && !this.props.loading && <i className={`iconfont icon-${this.props.icon}`} />}
                    <span>{this.props.value}</span>
                </button>
            </Tap>
        )
    }
}
Button.propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    nativeType: PropTypes.string,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    plain: PropTypes.bool
}

Button.defaultProps = {
    type: 'default',
    nativeType: 'button',
    loading: false,
    disabled: false,
    plain: false
};

module.exports = Button;