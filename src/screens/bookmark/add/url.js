import t from 't'
import { Component } from 'react'
import { Clipboard } from 'react-native'
import { InputURL } from 'co/form'
import Button, { Buttons } from 'co/button'
import { Form } from 'co/form'

const validateURL = (link='')=>/\D+:\/\//.test(link)

export default class BookmarkAddURL extends Component {
	state = {
		link: '',
		selection: undefined,
	}
	
	async componentDidMount() {
		if (this.state.link == ''){
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
						autoFocus
						last
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