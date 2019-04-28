import React from 'react'
import _ from 'lodash-es'
import t from 't'
import {fastFade} from 'co/style/animation'

import Tokens from './tokens'
import Suggested from './suggested'
import Other from './other'
import { Form, Input } from './style'

export default class TagsForm extends React.PureComponent {
	constructor(props) {
		super(props)

		this.state = {
			newTag:'',
			inputFocus: false
		}
	}

	bindInputRef = i=>this._field=i
	
	onChangeText = (newTag)=>this.setState({newTag})
	onSubmitText = ()=>{
		if (this.state.newTag)
			this.onAppendTag(this.state.newTag)
		else
			if (this._field)
				this._field.blur()
	}
	onKeyPress = ({nativeEvent})=>{
		if (nativeEvent.key=='Backspace' && !this.state.newTag && this._tokens)
			this._tokens.onSelectLastToken()
	}
	onFocus = ()=>{
		this.setState({inputFocus:true})

		if (typeof this.props.onFocus == 'function')
			this.props.onFocus()
	}
	onBlur = ()=>{
		this.setState({inputFocus:false})

		if (typeof this.props.onBlur == 'function')
			this.props.onBlur()
	}
	bindTokens = (r)=>{this._tokens=r}
	
	onAppendTag = (tagName)=>{
		fastFade();
		this.props.onChange(this.props.current.concat([tagName]))
		this.setState({newTag:''})
	}

	onRemoveTag = (tagName)=>{
		fastFade();
		this.props.onChange(_.reject(this.props.current, (s)=>(s==tagName)))
	}

	render() {
		var placeholder = t.s('addTag')
		if (this.props.current.length)
			placeholder = placeholder.toLowerCase()

		return (
			<Form.Wrap>
				<Tokens 
					ref={this.bindTokens}
					current={this.props.current}
					autoFocus={this.props.autoFocus}
					onAppendTag={this.onAppendTag}
					onRemoveTag={this.onRemoveTag}>
					<Input.Wrap>
						<Input.Input
							ref={this.bindInputRef}
							value={this.state.newTag}
							autoFocus={this.props.autoFocus}
							placeholder={placeholder+'...'}
							onChangeText={this.onChangeText}
							onSubmitEditing={this.onSubmitText}
							onKeyPress={this.onKeyPress}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							/>
					</Input.Wrap>
				</Tokens>

				<Other 
					current={this.props.current}
					other={this.props.other}
					filter={this.state.newTag}
					inputFocus={this.state.inputFocus}
					onAppendTag={this.onAppendTag} />

				<Suggested 
					//hide={this.state.inputFocus?true:false}
					suggested={this.props.suggested}
					onAppendTag={this.onAppendTag} />
			</Form.Wrap>
		)
	}
}