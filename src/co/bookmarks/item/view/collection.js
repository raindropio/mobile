import React from 'react'
import { View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import Icon from 'co/common/icon'
import { ItemSubinfo } from 'co/style/item'

const wrapStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	flex: 1,
	paddingTop: 4
}
const iconStyle = {
	width: 16,
	height: 16,
	marginRight: 8
}

class CommonCollectionContainer extends React.Component {
	render() {
		const {_id, title, cover=[], onPress} = this.props

		return (
			<BorderlessButton onPress={onPress} style={wrapStyle}>
				<View style={iconStyle}>
					<Icon collectionId={_id} src={cover[0]} size='small' />
				</View>
				<ItemSubinfo numberOfLines={1}>{title}</ItemSubinfo>
			</BorderlessButton>
		)
	}
}

export default connect(
	(state, {collectionId}) => collection(state, collectionId),
	()=>({})
)(CommonCollectionContainer)