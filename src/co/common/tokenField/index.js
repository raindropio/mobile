import t from 't'
import React from 'react'
import { Tokens, Input } from './style'
import { ClearButton } from 'co/common/searchBar'

export default class TokenField extends React.PureComponent {
	state = {
		focusedTag: ''
	}

	componentDidUpdate(prevProps) {
		if (prevProps.selected != this.props.selected)
			this.setState({focusedTag:''})
	}

	onSelectToken = (focusedTag)=>()=>{
		clearTimeout(this.selectTokenTimeout)

		if (this.state.focusedTag == focusedTag)
			return this.props.events.onRemove(focusedTag)

		this.setState({focusedTag})
		this.selectTokenTimeout = setTimeout(()=>this.setState({focusedTag:''}), 2000)
	}

	onSelectLastToken = ()=>{
		if (!this.props.selected.length)
			return;

		this.onSelectToken(this.props.selected[this.props.selected.length-1])()
	}

	renderItem = (name)=>{
		const active = name==this.state.focusedTag
		return (
			<Tokens.Item.Tap key={name} onPress={this.onSelectToken(name)}>
				<Tokens.Item.Content active={active}>
					<Tokens.Item.Text active={active}>{name+(!active ? ',' : '')}</Tokens.Item.Text>

					{active && <Tokens.Item.Clear source={require('assets/images/closeSmall.png')} />}
				</Tokens.Item.Content>
			</Tokens.Item.Tap>
		)
	}

	onChangeText = (text='')=>{
		if (text.slice(-1)==',')
			this.onSubmitText()
		else
			this.props.events.onValueChange(text)
	}

	onSubmitText = ()=>{
		this.props.events.onAdd(this.props.value)
	}

	onKeyPress = ({ nativeEvent })=>{
		if (nativeEvent.key=='Backspace' && !this.props.value)
			this.onSelectLastToken()
	}

	onEmptyAreaPress = ()=>
		this._input && this._input.focus()

	bindRef = (r)=>this._input=r

	render() {
		const { selected, showCancel, events, ...original } = this.props
		
		return (
			<Tokens.Wrap>
				{selected.map(this.renderItem)}
				
				<Input.Wrap>
					<Input.Input
						ref={this.bindRef}
						autoFocus
						{...original}
						onChangeText={this.onChangeText}
						onSubmitEditing={this.onSubmitText}
						onKeyPress={this.onKeyPress}
						onFocus={events.onFocus}
						onBlur={events.onBlur}
						/>
				</Input.Wrap>

				<Tokens.EmptyArea onPress={this.onEmptyAreaPress}>
					{(showCancel || selected.length>0) && <ClearButton onPress={events.onClear} />}
				</Tokens.EmptyArea>
			</Tokens.Wrap>
		)
	}
}