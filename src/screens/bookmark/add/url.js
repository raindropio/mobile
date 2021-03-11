import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { InputURL } from 'co/form'
import Button, { Buttons } from 'co/button'
import { Form } from 'co/form'

const validateURL = (link='')=>/\D+:\/\//.test(link)

export default class BookmarkAddURL extends React.Component {
	state = {
		link: '',
		selection: undefined,
	}
	
	async componentDidMount() {
		if (this.state.link == ''){
			if (Platform.OS=='ios' && !await Clipboard.hasURL())
				return

			const link = await Clipboard.getString()
			if (validateURL(link)){
				this.onChangeLink(link)

				this.setState({
					selection: link.length ? { start: 0, end: link.length } : undefined
				})
			}
		}
	}

	onChangeLink = (link)=>
		this.setState({ link, selection: undefined })

	onSubmitLink = ()=>{
		let link = this.state.link.trim()

		if (!validateURL(link))
			link = 'http://'+link

		this.props.navigation.replace('create', {
			type: 'url',
			values: [{ link, collectionId: this.props.collectionId }],
		})
	}

	bindRef = (r)=>this._input=r

	renderButtons = ()=>{
		const { link='' } = this.state
		const disabled = !link.trim()

		return (
			<Buttons vertical>
				<Button 
					background='color.accent'
					disabled={disabled}
					title={t.s('addBookmark')}
					bold
					onPress={this.onSubmitLink} />
			</Buttons>
		)
	}
	
	render() {
		return (
			<>
				<Form>
					<InputURL 
						last
						autoFocus
						returnKeyType='send'
						selection={this.state.selection}
						//selectTextOnFocus={true} //buggy, use selection instead
						placeholder={t.s('enterLink')}
						value={this.state.link}
						onChangeText={this.onChangeLink}
						onSubmitEditing={this.onSubmitLink} />
				</Form>

				{this.renderButtons()}
			</>
		)
	}
}