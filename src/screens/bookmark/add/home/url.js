import t from 't'
import React from 'react'
import { Platform } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import Navigation from 'modules/navigation'
import URLField from '../../edit/form/url'

const validateURL = (link='')=>/\D+\:\/\//.test(link)

export default class BookmarkAddURL extends React.Component {
	state = {
		link: ''
	}

	_navigationEvents = Navigation.events().bindComponent(this)
	componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }
	
	async componentDidMount() {
		if (this.state.link == ''){
			if (Platform.OS=='ios' && !await Clipboard.hasURL())
				return

			const link = await Clipboard.getString()
			if (validateURL(link))
				this.onChangeLink({link})
		}
	}

	navigationButtonPressed({ buttonId }) {
		switch(buttonId){
			case 'add':
				this.onSubmitLink()
			break
		}
	}

	onChangeLink = ({link})=>
		this.setState({link}, ()=>{
			Navigation.mergeOptions(this.props, {
				topBar: {
					rightButtons: this.state.link.trim() ? [
						{
							id: 'add',
							text: t.s('add')
						}
					] : []
				}
			})
		})

	onSubmitLink = ()=>{
		let value = this.state.link.trim()

		if (!validateURL(value))
			value = 'http://'+value

		Navigation.replace(this.props, 'bookmark/add/save', {
			values: [value],
			type: 'url',
			collectionId: this.props.collectionId
		})
	}

	bindRef = (r)=>this._input=r
	
	render() {
		return (
			<URLField 
				autoFocus
				returnKeyType='send'
				selectTextOnFocus={true}
				link={this.state.link}
				onChange={this.onChangeLink}
				onSubmit={this.onSubmitLink} />
		)
	}
}