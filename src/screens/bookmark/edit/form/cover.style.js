import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const CoverTap = styled.TouchableOpacity`
	align-self: center;
	width: 92px;
	height: 69px;
`

export const CoverWrap = styled.View`
	background-color: ${themed.main};
	padding: ${paddingHorizontal/2+4}px;
`