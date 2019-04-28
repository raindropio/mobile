import React from 'react'
import t from 't'
import { Tokens } from './style'

export default class TagsFormTokens extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			selectedName: ''
		}

		this.ic_close = require('assets/images/closeSmall.png')
	}

	componentDidUpdate(prevProps) {
		if (prevProps.current != this.props.current)
			this.setState({selectedName:''})
	}

	onSelectToken = (selectedName)=>()=>{
		clearTimeout(this.selectTokenTimeout)

		if (this.state.selectedName == selectedName)
			return this.props.onRemoveTag(selectedName)

		this.setState({selectedName})
		this.selectTokenTimeout = setTimeout(()=>this.setState({selectedName:''}), 2000)
	}

	onSelectLastToken = ()=>{
		if (!this.props.current.length)
			return;

		this.onSelectToken(this.props.current[this.props.current.length-1])()
	}

	renderCurrent = (name)=>{
		const active = name==this.state.selectedName
		return (
			<Tokens.Item.Tap key={name} onPress={this.onSelectToken(name)}>
				<Tokens.Item.Content active={active}>
					<Tokens.Item.Text active={active}>{name+(!active ? ',' : '')}</Tokens.Item.Text>

					{active && <Tokens.Item.Clear source={this.ic_close} />}
				</Tokens.Item.Content>
			</Tokens.Item.Tap>
		)
	}

	render() {
		return (
			<Tokens.Wrap>
				{this.props.current.map(this.renderCurrent)}
				{this.props.children}
			</Tokens.Wrap>
		)
	}
}