import t from 't'
import React from 'react'
import { Tokens, Input } from './style'

export default class TagsFormTokens extends React.PureComponent {
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
			this.props.events.onNewTagChange(text)
	}

	onSubmitText = ()=>{
		if (this.props.newTag)
			this.props.events.onAdd(this.props.newTag)
	}

	onKeyPress = ({ nativeEvent })=>{
		if (nativeEvent.key=='Backspace' && !this.props.newTag)
			this.onSelectLastToken()
	}

	render() {
		return (
			<Tokens.Wrap>
				{this.props.selected.map(this.renderItem)}
				
				<Input.Wrap>
					<Input.Input
						value={this.props.newTag}
						autoFocus
						placeholder={t.s('addTags')+'...'}
						onChangeText={this.onChangeText}
						onSubmitEditing={this.onSubmitText}
						onKeyPress={this.onKeyPress}
						/>
				</Input.Wrap>
			</Tokens.Wrap>
		)
	}
}