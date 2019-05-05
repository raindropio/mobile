import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const CoverTap = styled.TouchableOpacity`
	align-items: center;
	padding: ${paddingHorizontal/2}px;
	background-color: ${themed.main};
`