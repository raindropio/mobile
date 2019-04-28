import styled from 'styled-components/native'
import { paddingHorizontal, fontSize } from 'co/style/constants'
import colors, {themed} from 'co/style/colors'
import { Platform } from 'react-native'

const height = 74

export const HeadView = styled.View`
	padding-top: 4px;
`

export const HeadItems = styled.FlatList.attrs({
	keyboardDismissMode:'on-drag',
	keyboardShouldPersistTaps:'always',
	showsHorizontalScrollIndicator: Platform.OS=='ios'
})`
	padding-vertical: ${paddingHorizontal}px;
	height: ${height+paddingHorizontal*2}px;
`

export const HeadItem = styled.View`
	height: ${height}px;
	justify-content: center;
	align-items: center;
	padding-horizontal: ${paddingHorizontal}px;
`

export const IconView = styled.View`
	width: 48px;
	height: 48px;
	border-radius: 24px;
	margin-top: 4px;
	justify-content: center;
	align-items: center;
	background-color: ${({type})=>{
		switch(type){
			case 'important': return colors.red;
			case 'article': return colors.orange;
			case 'image': return colors.green;
			case 'video': return colors.purple;
			case 'broken': return colors.asphalt;
		}
	}}
`

export const IconImage = styled.Image`
	tint-color: #ffffff;
`

export const IconText = styled.Text`
	font-size: ${fontSize.sub}px;
	margin-top: 8px;
	color: ${themed.inverted};
`