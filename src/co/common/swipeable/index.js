import React from 'react'
import {PanResponder} from 'react-native'
import Interactable from 'react-native-interactable'
import {store} from 'data'
import {setSwipeables} from 'local/actions'
//import {isExtension} from 'modules/native'

import {
	buttonWidth,
	nativeStyles,
	SwipeableRow,
	SwipeableButtonsView,
	SwipeableButton,
	SwipeableButtonIcon
} from 'co/common/swipeable/style'

const interView = {
	boundaries: {right: 0}
}

export default class SwipeableContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({
			open: false
		}, this.prepare(props, true))

		this._panResponder = /*isExtension() ? PanResponder.create({
			onMoveShouldSetPanResponderCapture: ()=> this.state.open,
			onShouldBlockNativeResponder: ()=>false
		}) :*/ {panHandlers:{}}
	}

	bindInstanceRef = (ref)=>this.instance=ref

	//Actions
	close = ()=>{
		if (this.instance)
			this.instance.snapTo({index: 0})
	}

	//Events
	componentWillReceiveProps(nextProps) {
		const nextState = this.prepare(nextProps)
		if (Object.keys(nextState).length)
			this.setState(nextState)
	}

	componentWillUnmount() {
		if (this.unsubStore)
			this.unsubStore()
	}

	prepare = (nextProps, force)=>{
		var nextState = {}
		if (force || (nextProps.buttons||[]).length != (this.props.buttons||[]).length)
			nextState.snapPoints = [
				{x: 0},
				{x:parseInt(-1*buttonWidth*nextProps.buttons.length)}
			]

		return nextState
	}

	setOpenState = (newOpen)=>{
		if (this.state.open == newOpen)
			return;

		this.setState({open: newOpen})

		//store changes
		if (this.unsubStore){
			this.unsubStore(); 
			this.unsubStore = undefined;
		}

		if (newOpen){
			store.dispatch(setSwipeables(new Date().getTime()))
			this.unsubStore = store.subscribe(this.onStoreUpdate)
		}
	}

	onStoreUpdate = ()=>{
		this.previousValue = this.currentValue
		this.currentValue = store.getState().local.swipeables

		if (this.previousValue !== this.currentValue){
			this.unsubStore(); 
			this.unsubStore = undefined;
			this.close()
		}
	}

	onDrag = ()=>{
		this.setOpenState(true)
	}

	onStop = ({nativeEvent})=>{
		this.setOpenState(nativeEvent.x<0)
	}

	//Buttons
	onButtonPress = (name)=>{
		this.close()
		if (typeof this.props.onPress == 'function')
			this.props.onPress(name)
	}

	renderButton = (item)=>(
		<SwipeableButton key={item.name} danger={item.danger} onPress={()=>this.onButtonPress(item.name)}>
			<SwipeableButtonIcon source={item.icon} danger={item.danger} />
		</SwipeableButton>
	)

	renderButtons = (open, buttons)=>{
		var items;
		if (open)
			items = (buttons||[]).map(this.renderButton)
		else
			return null

		return (
			<SwipeableButtonsView key='buttons' open={open}>
				{items}
			</SwipeableButtonsView>
		)
	}

	//Component
	render() {
		return [
			this.renderButtons(this.state.open, this.props.buttons),

			<Interactable.View
				key='inter'
				ref={this.bindInstanceRef}
				style={nativeStyles.interactable}
				horizontalOnly={true}
				snapPoints={this.state.snapPoints}
				boundaries={interView.boundaries}
				animatedNativeDriver={true}
				onDrag={this.onDrag}
				onStop={this.onStop}>
					<SwipeableRow 
						key='row'
						open={this.state.open}
						{...this._panResponder.panHandlers}>
						{this.props.children}
					</SwipeableRow>
			</Interactable.View>
		]
	}
}