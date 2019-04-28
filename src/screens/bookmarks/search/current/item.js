import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
	CurrentItem,
	CurrentText,
	CurrentClearImage
} from 'co/style/baloon'
import getFilterTitle from 'co/search/utils/filterTitle'
import getFilterColor from 'co/search/utils/filterColor'

const close = <CurrentClearImage source={require('assets/images/closeSmall.png')} />

export default class Item extends React.PureComponent {
	onPress = ()=>{
		const {_key, val} = this.props
		this.props.onRemove(_key, val)
	}

	render() {
		const {_key, val} = this.props

		return (
			<TouchableOpacity onPress={this.onPress}>
				<CurrentItem tintColor={getFilterColor(_key,val)}>
					<CurrentText>{getFilterTitle(_key,val)}</CurrentText>
					{close}
				</CurrentItem>
			</TouchableOpacity>
		)
	}
}