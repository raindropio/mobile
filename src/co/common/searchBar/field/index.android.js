import React from 'react'
import { Wrap, Input, Icon, Button } from './style'

const clear = <Icon source={require('assets/images/close.png')} />

export default class Search extends React.PureComponent {
	state = {
		word: ''
	}

	componentDidUpdate(prevProps) {
		if (prevProps.autoFocus != this.props.autoFocus){
			this._input && this._input.focus()
		}
	}

	componentDidMount() {
		if (this.props.autoFocus){
			this._input && this._input.focus()
		}
	}

	onChange = (text)=>
		this.setState({word: text}, ()=>{
			this.props.onChange && this.props.onChange(text)
		})

	onSubmit = ()=>{
		this.props.onSubmit && this.props.onSubmit(this.state.word)
	}

	onClear = ()=>{
		this.setState({word: ''})

		if (this.props.showCancel && (this.state.word||'').trim() == '')
			this.props.onCancel()
	}

	bindInputRef = (ref)=>this._input=ref

	render() {
		return (
			<Wrap>
				<Input 
					ref={this.bindInputRef}
					autoFocus={this.props.autoFocus}
					placeholder={this.props.placeholder}
					defaultValue={this.state.word}
					onChangeText={this.onChange}
					onSubmitEditing={this.onSubmit} />

				{this.props.showCancel || (this.state.word ? true : false) ? <Button onPress={this.onClear}>{clear}</Button> : null}
			</Wrap>
		)
	}
}