import styled from 'styled-components/native'
import { 
	paddingHorizontal,
	fontSize
} from 'co/style/constants'
import colors from 'co/style/colors'

export const SubInfo = styled.View`
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	padding: ${paddingHorizontal}px;
`

export const SubInfoText = styled.Text`
	font-size: ${fontSize.micro}px;
	color: ${colors.textGray};
	text-align: center;
`

export const SubInfoLink = styled(SubInfoText)`
	color: ${colors.theme};
`