import React from 'react'
import { Image, LoadingWrap } from './style'

export default class Cover extends React.PureComponent {
	static defaultProps = {
		mode:		'crop',
		ar:			'',
		preloader:	false
	}

	state = {
		loaded: false
	}

	onLoadEnd = ()=>
		this.setState({ loaded: true })

	renderImage = ()=>{
		const { preloader, ...props } = this.props

		return (
			<Image 
				key='image'
				{...props}
				onError={preloader && this.onError}
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