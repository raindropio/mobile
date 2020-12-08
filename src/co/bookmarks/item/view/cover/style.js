import { PixelRatio } from 'react-native'
import styled from 'styled-components/native'
import getThumb from 'data/modules/format/thumb'
import getScreenshotUri from 'data/modules/format/screenshot'
import { ActivityIndicator } from 'co/native'

//image
var _dpr
const getDPR = function() {
	if (!_dpr) _dpr = Math.ceil(PixelRatio.get())
	return _dpr
}

const defaultSource = {
	light: require('./defaultSource.light.png'),
	dark: require('./defaultSource.dark.png')
}

export const Image = styled.Image.attrs(({ src, link, mode='', ar='', width='', height='', theme })=>{
	let thumb = src ? getThumb(src) : ''
	if (!thumb && link)
		thumb = getScreenshotUri(link)

	if (thumb)
		return {
			src: undefined,
			source: {
				uri: `${thumb}?mode=${mode}&ar=${ar}&width=${width}&height=${height}&dpr=${getDPR()}`,
				scale: getDPR()
			},
			resizeMethod: 'scale',
			defaultSource: defaultSource[theme.dark ? 'dark' : 'light'],
			fadeDuration: 0
		}

	return {
		defaultSource,
		src: undefined
	}
})`
	width: ${({width})=>width?width+'px':'auto'};
	height: ${({height})=>height?height+'px':'auto'};
	border-radius: 3px;
`

//loading
export const LoadingWrap = styled(ActivityIndicator)`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`