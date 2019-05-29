import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { StyleSheet } from 'react-native'
import { constants } from 'co/bookmarks/item/view/style'

export const CoverImage = styled(FastImage).attrs({
	resizeMode: FastImage.resizeMode.cover
})`
	border-width: ${StyleSheet.hairlineWidth}px;
	border-color: #00000025;
	${props => getSize(props)}
	${({fallbackColor})=>fallbackColor&&'background-color: '+fallbackColor+';'}
`

const getSize = ({size})=>{
	switch(size){
		case 'list': return `
			width: ${constants.list.coverWidth};
			height: ${constants.list.coverHeight};
		`

		case 'simple': return `
			width: ${constants.simple.coverSize};
			height: ${constants.simple.coverSize};
		`

		case 'grid': return `
			position: absolute;
			width: 100%;
			height: 100%;
		`
	}
}