import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
	HeadItem,
	IconView,
	IconImage,
	IconText
} from './style'
import getFilterTitle from 'co/search/utils/filterTitle'

const icons = {
	important: require('assets/images/star.png'),
	article: require('assets/images/article.png'),
	image: require('assets/images/image.png'),
	video: require('assets/images/video.png'),
	broken: require('assets/images/broken.png'),
}

export default class Item extends React.PureComponent {
	onPress = ()=>{
		const {name} = this.props
		switch (name) {
			case 'important':
			case 'broken':
				this.props.onAppend(name, 1)
			break;

			default:
				this.props.onAppend('type', name)
			break;
		}
	}

	render() {
		const {name, type} = this.props

		return (
			<TouchableOpacity onPress={this.onPress}>
			<HeadItem>
				<IconView type={name}><IconImage source={icons[name]} /></IconView>
				<IconText>{getFilterTitle(type, name)}</IconText>
			</HeadItem>
			</TouchableOpacity>
		)
	}
}