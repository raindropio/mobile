import { PixelRatio } from 'react-native'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import getThumb from 'data/modules/format/thumb'
import getScreenshotUri from 'data/modules/format/screenshot'

//image
var _dpr
const getDPR = function() {
	if (!_dpr) _dpr = Math.ceil(PixelRatio.get())
	return _dpr
}

export const Image = styled(FastImage).attrs(({ src, link, mode='', ar='', width='', height='' })=>{
	let thumb = src ? getThumb(src) : ''
	if (!thumb && link)
		thumb = getScreenshotUri(link)

	if (thumb)
		return {
			source: {
				uri: `${thumb}?mode=${mode}&ar=${ar}&width=${width}&height=${height}&dpr=${getDPR()}`,
				priority: FastImage.priority.low
			}
		}

	return {}
})`
	width: ${({width})=>width?width+'px':'auto'};
	height: ${({height})=>height?height+'px':'auto'};
	border-radius: 3px;
`

//loading
export const LoadingWrap = styled.ActivityIndicator.attrs(({theme})=>({
	color: theme.color.accent
}))`
	position: absolute;
	z-index: 1;
	left:0;right:0;bottom:0;top:0;
`