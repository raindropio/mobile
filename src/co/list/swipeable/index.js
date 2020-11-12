import * as React from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { width } from './button'
import Context from './context'

export * from './button'

let opened = new Set([])

export default class MySwipeable extends React.Component {
    static defaultProps = {
        left: undefined, //react element
        right: undefined //react elements
    }

    state = {
        value: 0,
        sides: [0],
        left: {},
        right: {},
        connected: false
    }

    x = new Animated.Value(0)
    onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: this.x } }],
        { useNativeDriver: true }
    )
    mainStyle = {
        transform: [{ translateX: this.x }]
    }
    _activeOffsetX = [0, 50]

    componentWillUnmount() {
        opened.delete(this.actions.close)
    }

    onHandlerStateChange = ({ nativeEvent: { oldState, translationX, velocityX } }) => {
        switch(oldState) {
            case State.BEGAN:
                this.connect()
                this.x.setValue(0)
                this.x.setOffset(this.state.value)
            break

            case State.ACTIVE:{
                //descide where to go next
                let side = this.state.sides.indexOf(this.state.value)
                if (translationX < -50) side++
                else if (translationX > 50) side--

                side = Math.min(Math.max(side, 0), this.state.sides.length-1)

                this.scroll(this.state.sides[side], { translationX, velocityX })
            }break
        }
    }

    scroll = (value, event={})=>{
        const { velocityX=0, translationX=0 } = event

        if (value){
            //close other
            for(const close of opened)
                close()

            opened.add(this.actions.close)
        }

        this.x.setValue(this.state.value+translationX)
        this.x.setOffset(0)
        this.setState({ value }, ()=>{
            Animated.spring(this.x, {
                velocity: velocityX,
                restSpeedThreshold: 1.7,
                restDisplacementThreshold: 0.4,
                bounciness: 0,
                toValue: this.state.value,
                useNativeDriver: true,
            }).start(({ finished })=>{
                if (finished && !this.state.value)
                    this.unconnect()
            })
        })
    }

    connect = ()=>{
        if (this.state.connected) return

        let sides = [0]

        //left
        let left = {
            component: this.props.left ? this.props.left() : undefined
        }
        left.width = (left.component ? (typeof left.component.length != 'undefined' ? left.component.length : 1) : 0) * width

        if (left.width) {
            sides.unshift(left.width)

            left.style = {
                flexDirection: 'row', 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                bottom: 0, 
                transform: [{ translateX: this.x.interpolate({
                    inputRange: [0, left.width],
                    outputRange: [-left.width, 0],
                    extrapolate: 'clamp'
                }) }]
            }
        }

        //right
        let right = {
            component: this.props.right ? this.props.right() : []
        }
        right.width = (right.component ? (typeof right.component.length != 'undefined' ? right.component.length : 1) : 0) * width

        if (right.width) {
            sides.push(-right.width)

            right.style = {
                flexDirection: 'row', 
                position: 'absolute', 
                right: 0, 
                top: 0, 
                bottom: 0, 
                transform: [{ translateX: this.x.interpolate({
                    inputRange: [-right.width, 0],
                    outputRange: [0, right.width],
                    extrapolate: 'clamp'
                }) }]
            }
        }

        this.setState({ 
            sides, 
            left, 
            right,
            connected: true
        })
    }

    unconnect = ()=>{
        opened.delete(this.actions.close)
        
        this.setState({
            left: {},
            right: {},
            connected: false
        })
    }

    actions = {
        close: ()=>{
            this.scroll(0)
        }
    }

    render() {
        return (
            <Context.Provider value={this.actions}>
                {this.state.left.width ? (
                    <Animated.View style={this.state.left.style}>
                        {this.state.left.component}
                    </Animated.View>
                ) : undefined}
                
                {this.state.right.width ? (
                    <Animated.View style={this.state.right.style}>
                        {this.state.right.component}
                    </Animated.View>
                ) : undefined}

                <PanGestureHandler 
                    enabled={this.props.left || this.props.right ? true : false}
                    activeOffsetX={this._activeOffsetX}
                    activeOffsetY={-999}
                    onGestureEvent={this.onGestureEvent}
                    onHandlerStateChange={this.onHandlerStateChange}>
                    <Animated.View 
                        pointerEvents={this.state.value ? 'box-only' : 'auto'}
                        style={this.mainStyle}>
                        {this.props.children}
                    </Animated.View>
                </PanGestureHandler>
            </Context.Provider>
        )
    }
}