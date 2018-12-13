import React,{Component} from 'react';
class Direction extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    touchStart = (e) => {
        console.log(e);
        console.log('touchStart： '+e.pageX)
    }

    touchMove = (e) => {
        console.log(e);
        console.log('touchMove： '+e.originalEvent.targetTouches[0].pageX)
    }

    touchEnd = (e) => {
        console.log(e);
        console.log('touchEnd： '+e.pageX)
    }

    render() {
        return (
            <div ref="container">
                <div>下拉刷新</div>
                <div ref="scroll" onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

module.exports = Direction;