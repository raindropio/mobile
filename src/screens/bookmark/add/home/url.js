import t from 't'
import React from 'react'
import Clipboard from '@react-native-community/react-native-clipboard'
import Navigation from 'modules/navigation'
import { Form } from 'co/style/form'
import URLField from '../../edit/form/url'

const validateURL = (link='')=>/\D+\:\/\//.test(link)

export default class BookmarkAddURL extends React.Component {
	state = {
		link: ''
	}

	async componentDidMount() {
        this._navigationEvents = Navigation.events().bindComponent(this)

        const link = await Clipboard.getString()
        if (validateURL(link))
			this.onChangeLink({link})
    }

    componentWillUnmount() { this._navigationEvents && this._navigationEvents.remove() }

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
			value,
			type: 'url',
			collectionId: this.props.collectionId
		})
	}

	bindRef = (r)=>this._input=r
	
	render() {
		return (
			<Form first>
				<URLField 
                    autoFocus
                    returnKeyType='send'
					selectTextOnFocus={true}
                    link={this.state.link}
                    onChange={this.onChangeLink}
                    onSubmit={this.onSubmitLink} />
            </Form>
		)
	}
}