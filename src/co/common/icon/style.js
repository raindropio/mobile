import styled from 'styled-components/native'
import { themed } from 'co/style/colors'
import { constants } from 'co/collections/item/style'

export const iconSize = {
	big: 48
}

const getSize = ({size})=>{
	switch(size){
		case 'big': return `
			width: ${iconSize.big}px;
			height: ${iconSize.big}px;
		`

		case 'list': return `
			width: 24px;
			height: 24px;
		`

		case 'small': return `
			width: 16px;
			height: 16px;
		`

		default: return `
			width: ${constants.coverSize}px;
			height: ${constants.coverSize}px;
		`
	}
}

export const IconImage = styled.Image`
	${props => getSize(props)}
`

export const DefaultIconImage = styled(IconImage).attrs({
	source: require('assets/images/collection.png')
})`
	tint-color: ${themed.tintColor};
`