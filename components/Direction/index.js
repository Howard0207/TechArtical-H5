import React,{Component} from 'react';
class Direction extends Component {
    constructor(props) {
        super(props);
        this.reSet();
    }

    componentDidMount() {
        this.refs.refresh.addEventListener('touchmove',this.touchMove,{passive:true});
    }

    reSet = () => {
        this.state = {
            touchStarTime: '',
            startPageY: 0,
            endPageY: 0,
            direction: '',
            sub: 0
        }
    }

    touchStart = (e) => {
        this.state.touchStarTime = new Date().getTime();
        this.state.startPageX = e.touches[0].pageX;
        this.state.startPageY = e.touches[0].pageY;
        console.log(e.touches)
        console.log('touchStart： '+e.pageX)
    }

    touchMove = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
        console.log(event);
        let startPageY = this.state.startPageY,
            endPageY = this.state.endPageY = e.touches[0].pageY;
        this.state.sub = endPageY - startPageY;
        console.log(this.state.sub,this.refs.container.scrollTop);
        if(this.refs.container.scrollTop == 0) {
            let marginTop = this.state.sub*0.4 - 80;
            this.refs.refresh.style.marginTop = marginTop>0?'0px':marginTop+'px';
        } else {
        }
        // this.refs.scroll.style.top += this.state.sub;

        // console.log(this.refs.scroll.style.top);
        // console.log(this.refs.scroll.offsetTop);
    }


    touchEnd = () => {
        event.preventDefault();

        let sub = this.state.sub,
            touchStarTime = this.state.touchStarTime,
            touchEndTime = new Date().getTime();
        if(touchEndTime-touchStarTime<300&&Math.abs(sub)>30) {  // 判断是否为快速滑动
            this.fingerDirection();
        } else {

        }
        this.refs.refresh.style.marginTop = '-80px';
        this.reSet();
    }

    fingerDirection = () => {
        let direction = this.state.direction;
        this.props[direction]&&this.props[direction]();
    }
    

    render() {
        return (
            <div ref="container" style={{height: '400px', overflowY:'scroll'}}>
                <div ref="refresh" className="refresh" style={{height: '80px', marginTop: '-80px'}} >下拉刷新</div>
                <div ref="scroll" onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd} style={{height:'800px'}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

module.exports = Direction;