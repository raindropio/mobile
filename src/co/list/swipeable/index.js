import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { store } from 'data'
import { setSwipeables } from 'local/actions'
import Buttons from './buttons'
import Context from './context'

export * from './button'

export default class MySwipeable extends React.Component {
    static defaultProps = {
        left: undefined, //react element
        right: undefined //react elements
    }

    _swipeable = React.createRef()

    //events
    componentWillUnmount() {
		if (this.unsubStore)
			this.unsubStore()
    }
    
    onSwipeableOpen = ()=>{
        this._id = new Date().getTime()
        store.dispatch(setSwipeables(this._id))
        this.unsubStore = store.subscribe(this.onStoreUpdate)
    }

    onStoreUpdate = ()=>{
		if (this._id !== store.getState().local.swipeables){
            if (this.unsubStore) {
                this.unsubStore()
                this.unsubStore = undefined
            }
			this.actions.close()
		}
	}

    //context
    actions = {
        close: ()=>{
            if (this._swipeable.current)
                this._swipeable.current.close()
        }
    }

    //rendering
    renderLeftActions = (progress, dragX) =>
        <Buttons getItems={this.props.left} direction='left' dragX={dragX} />

    renderRightActions = (progress, dragX) =>
        <Buttons getItems={this.props.right} direction='right' dragX={dragX} />

    render() {
        const { children, left, right } = this.props

        return (
            <Context.Provider value={this.actions}>
                <Swipeable 
                    ref={this._swipeable}
                    leftThreshold={30}
                    rightThreshold={40}
                    overshootFriction={8}
                    renderLeftActions={left ? this.renderLeftActions : undefined}
                    renderRightActions={right ? this.renderRightActions : undefined}
                    onSwipeableOpen={this.onSwipeableOpen}>
                    {children}
                </Swipeable>
            </Context.Provider>
        )
    }
}