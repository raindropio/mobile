import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const CoverTap = styled.TouchableOpacity`
	align-self: center;
	padding: ${paddingHorizontal/2+4}px;
`

export const CoverWrap = styled.View`
	background-color: ${themed.main};
	position: relative;
`