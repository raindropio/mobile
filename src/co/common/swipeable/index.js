import React from 'react'
import { View } from 'react-native'
import Interactable from 'react-native-interactable'
import {store} from 'data'
import {setSwipeables} from 'local/actions'

import {
	buttonWidth,
	styles,
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
	}

	bindInstanceRef = (ref)=>this.instance=ref

	//Actions
	close = ()=>{
		if (this.instance)
			this.instance.snapTo({index: 0})
	}

	//Events
	componentDidUpdate(prevProps) {
		if (prevProps != this.props) {
			const nextState = this.prepare(prevProps)
			if (Object.keys(nextState).length)
				this.setState(nextState)
		}
	}

	componentWillUnmount() {
		if (this.unsubStore)
			this.unsubStore()
	}

	prepare = (prevProps, force)=>{
		var nextState = {}
		if (force || (prevProps.buttons||[]).length != (this.props.buttons||[]).length)
			nextState.snapPoints = [
				{x: 0},
				{x:parseInt(-1*buttonWidth*this.props.buttons.length)}
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
	onButtonPress = (id)=>{
		this.close()
		if (typeof this.props.onPress == 'function')
			this.props.onPress(id)
	}

	renderButton = (item)=>(
		<SwipeableButton key={item.id} danger={item.style=='destructive'} onPress={()=>this.onButtonPress(item.id)}>
			<SwipeableButtonIcon source={item.icon} danger={item.style=='destructive'} />
		</SwipeableButton>
	)

	renderButtons = (open, buttons)=>{
		var items;
		if (open)
			items = (buttons||[]).map(this.renderButton)
		else
			return null

		return (
			<View style={styles.buttons} open={open}>
				{items}
			</View>
		)
	}

	//Component
	render() {
		return (
			<React.Fragment>
				{this.renderButtons(this.state.open, this.props.buttons)}

				<Interactable.View
					ref={this.bindInstanceRef}
					style={styles.interactable}
					horizontalOnly={true}
					snapPoints={this.state.snapPoints}
					boundaries={interView.boundaries}
					animatedNativeDriver={true}
					onDrag={this.onDrag}
					onStop={this.onStop}>
						<View style={this.state.open ? [styles.row, styles.rowOpen] : styles.row}>
							{this.props.children}
						</View>
				</Interactable.View>
			</React.Fragment>
		)
	}
}