import { Component } from 'react';
import { View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { collection } from 'data/selectors/collections'
import Icon from 'co/collections/item/icon'
import { ItemSubinfo } from 'co/style/item'

const wrapStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	flex: 1
}
const iconStyle = {
	width: 20,
	height: 20,
	marginRight: 8
}

class CommonCollectionContainer extends Component {
	onPress = ()=>
		this.props.onPress(this.props._id)

	render() {
		const {_id, title, cover=[]} = this.props

		return (
			<TouchableOpacity onPress={this.onPress} hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
				<View style={wrapStyle}>
					<View style={iconStyle}>
						<Icon collectionId={_id} src={cover[0]} size={16} />
					</View>
					<ItemSubinfo numberOfLines={1}>{title}</ItemSubinfo>
				</View>
			</TouchableOpacity>
		)
	}
}

export default connect(
	(state, {collectionId}) => collection(state, collectionId),
	()=>({})
)(CommonCollectionContainer)