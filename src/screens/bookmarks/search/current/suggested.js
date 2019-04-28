import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
	SuggestedItem,
	SuggestedText
} from 'co/style/baloon'
import getFilterTitle from 'co/search/utils/filterTitle'

export default class Suggested extends React.PureComponent {
	onPress = ()=>{
		const {_key, val} = this.props
		this.props.onAppend(_key, val)
	}

	render() {
		const {_key, val} = this.props

		return (
			<TouchableOpacity onPress={this.onPress}>
				<SuggestedItem>
					<SuggestedText>{getFilterTitle(_key,val)}</SuggestedText>
				</SuggestedItem>
			</TouchableOpacity>
		)
	}
}