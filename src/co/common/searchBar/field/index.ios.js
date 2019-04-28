import React from 'react'
import { Wrap, Field, Tap, BackIcon } from './style'

export default class SearchFieldIos extends React.PureComponent {
	state = {
		word: ''
	}

	componentDidUpdate(prevProps) {
		if (prevProps.autoFocus != this.props.autoFocus){
			this._searchBar && this._searchBar.focus()
		}
	}

	componentDidMount() {
		if (this.props.autoFocus)
			this._searchBar && this._searchBar.focus()
	}

	onChange = (text)=>{
		this.setState({word: text}, ()=>{
			this.props.onChange && this.props.onChange(text)
		})
	}

	onSubmit = ()=>{
		this.props.onSubmit && this.props.onSubmit(this.state.word)

		if (!this.state.word)
			this._searchBar.unFocus()
	}

	onCancel = ()=>{
		if (this.props.showCancel)// && (this.state.word||'').trim() == ''
			this.props.onCancel()
	}

	bindRef = (r)=>
		this._searchBar = r

	render() {
		return (
			<Wrap>
				<Field
					ref={this.bindRef}
					placeholder={this.props.placeholder}
					showsCancelButton={this.props.showCancel || (this.state.word ? true : false)}
					onChangeText={this.onChange}
					onSearchButtonPress={this.onSubmit}
					onCancelButtonPress={this.onCancel}
					/>
			</Wrap>
		)
	}
}