import React from 'react'
import { PixelRatio } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getColorForString } from 'data/helpers/colors'
import getThumb from 'data/modules/format/thumb'
import { LoadingWrap } from './style'

var _dpr
const getDPR = function() {
	if (!_dpr) _dpr = Math.ceil(PixelRatio.get())
	return _dpr
}

export default class Cover extends React.PureComponent {
	static defaultProps = {
		mode:		'crop',
		ar:			'',
		preloader:	false
	}

	state = this.prepareState(this.props)

	componentDidUpdate(prevProps) {
		if (prevProps.src != this.props.src ||
			prevProps.width != this.props.width ||
			prevProps.height != this.props.height)
			this.setState(this.prepareState(this.props))
	}

	prepareState() {
		const { src, mode='', ar='', width='', height='' } = this.props
		const thumb = src ? getThumb(src) : ''

		if (thumb)
			return {
				loaded: false,
				source: {
					uri: `${thumb}&mode=${mode}&ar=${ar}&width=${width}&height=${height}&dpr=${getDPR()}`,
					priority: FastImage.priority.low
				}
			}
		else
			return this.fallback()
	}

	fallback() {
		if (this.props.domain)
			return { loaded: true, fallbackColor: getColorForString(this.props.domain||'')+'40' }
		else
			return {}
	}

	onError = ()=>{
		this.setState(this.fallback())
	}

	onLoadEnd = ()=>{
		this.setState({ loaded: true })
	}

	renderImage = ()=>{
		const { source, fallbackColor } = this.state
		const { preloader, src, domain, width, height, ...props } = this.props

		return (
			<FastImage 
				key='image'
				{...props}
				style={{ width: width||'auto', height: height||'auto', backgroundColor: fallbackColor||'#fafafa' }}
				source={source}
				onError={this.onError}
				onLoadEnd={preloader && this.onLoadEnd} />
		)
	}

	render() {
		if (this.props.preloader && !this.state.loaded)
			return [ <LoadingWrap key='loading'/>, this.renderImage() ]
		else
			return this.renderImage()
	}
}