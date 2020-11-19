import React from 'react'
import { View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import Icon from 'co/collections/item/icon'
import { ItemSubinfo } from 'co/style/item'

const wrapStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	flex: 1,
	paddingVertical: 8,
	paddingHorizontal: 8,
	marginBottom: -4,
	marginLeft: -8
}
const iconStyle = {
	width: 20,
	height: 20,
	marginRight: 8
}

class CommonCollectionContainer extends React.Component {
	onPress = ()=>
		this.props.onPress(this.props._id)

	render() {
		const {_id, title, cover=[]} = this.props

		return (
			<BorderlessButton onPress={this.onPress} style={wrapStyle}>
				<View style={iconStyle}>
					<Icon collectionId={_id} src={cover[0]} size={16} />
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