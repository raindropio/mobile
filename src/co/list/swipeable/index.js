import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { store } from 'data'
import { setSwipeables } from 'local/actions'
import Buttons from './buttons'
import Context from './context'

export * from './button'

export default class MySwipeable extends React.PureComponent {
    static defaultProps = {
        left: undefined, //react element
        right: undefined //react elements
    }

    state = {
        open: false
    }

    _swipeable = React.createRef()

    _activeOffsetX = [0, 50]

    //events
    componentWillUnmount() {
		if (this.unsubStore)
			this.unsubStore()
    }

    onSwipeableClose = ()=>
        this.setState({ open: false })
    
    onSwipeableOpen = ()=>{
        this.setState({ open: true })

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
    renderLeftActions = (progress) =>
        <Buttons getItems={this.props.left} direction='left' progress={progress} />

    renderRightActions = (progress) =>
        <Buttons getItems={this.props.right} direction='right' progress={progress} />

    render() {
        const { children, left, right } = this.props
        const { open } = this.state

        return (
            <Context.Provider value={this.actions}>
                <Swipeable 
                    ref={this._swipeable}
                    friction={2}
                    useNativeAnimations={true}
                    activeOffsetX={open ? undefined : this._activeOffsetX}
                    renderLeftActions={left ? this.renderLeftActions : undefined}
                    renderRightActions={right ? this.renderRightActions : undefined}
                    onSwipeableOpen={this.onSwipeableOpen}
                    onSwipeableClose={this.onSwipeableClose}>
                    {children}
                </Swipeable>
            </Context.Provider>
        )
    }
}