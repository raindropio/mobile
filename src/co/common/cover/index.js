import React from 'react'
import FastImage from 'react-native-fast-image'
import { getColorForString } from 'data/helpers/colors'
import {CoverImage} from './style'

const commonSource = {
	priority: FastImage.priority.low,
	cache: FastImage.cacheControl.web
}

export default class Cover extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = this.prepareState(props)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.src != this.props.src || prevProps.images != this.props.images)
			this.setState(this.prepareState(this.props))
	}

	prepareState(props) {
		var state = {}

		if (props.src)
			state.source = {uri: props.src, ...commonSource}
		else if (props.images){
			switch(props.size) {
				case 'simple':
				case 'list':
					if (props.images.small)
						state.source = {uri: props.images.small, ...commonSource}
					break;

				case 'grid': 
					if (props.images.medium)
						state.source = {uri: props.images.medium, ...commonSource}
					break;
			}
		}

		return state
	}

	onError = ()=>{
		this.setState({fallbackColor: getColorForString(this.props.domain||'')+'40'})
	}

	render() {
		return (
			<CoverImage 
				source={this.state.source}
				size={this.props.size}
				fallbackColor={this.state.fallbackColor}
				style={this.props.style}
				onError={this.onError} />
		)
	}
}