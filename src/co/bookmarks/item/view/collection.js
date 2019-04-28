import React from 'react'
import {View} from 'react-native'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'

import Icon from 'co/common/icon'

import {
	ItemSubinfo
} from 'co/style/item'

const iconStyle = {
	width: 16,
	height: 16,
	marginRight: 8
}

class CommonCollectionContainer extends React.Component {
	render() {
		const {_id, title, cover, color} = this.props
		
		return [
			(<View key={'cid_cover_'+_id} style={iconStyle}>
				<Icon collectionId={_id} src={cover} title={title} color={color} size='small' />
			</View>),
			<ItemSubinfo key={'cid_text_'+_id} numberOfLines={1}>{title}</ItemSubinfo>
		]
	}
}

export default connect(
	(state, {collectionId}) => collection(state, collectionId),
	()=>({})
)(CommonCollectionContainer)