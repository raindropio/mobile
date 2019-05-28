import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import Events from 'modules/events'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import Icon from 'co/common/icon'
import { ItemSubinfo } from 'co/style/item'

const wrapStyle = {
	flexDirection: 'row',
	alignItems: 'center'
}
const iconStyle = {
	width: 16,
	height: 16,
	marginRight: 8
}

class CommonCollectionContainer extends React.Component {
	render() {
		const {_id, title, cover, color, onPress} = this.props

		return (
			<TouchableOpacity onPress={this.props.onPress} style={wrapStyle}>
				<View style={iconStyle}>
					<Icon collectionId={_id} src={cover} title={title} color={color} size='small' />
				</View>
				<ItemSubinfo numberOfLines={1}>{title}</ItemSubinfo>
			</TouchableOpacity>
		)
	}
}

export default connect(
	(state, {collectionId}) => collection(state, collectionId),
	()=>({})
)(CommonCollectionContainer)