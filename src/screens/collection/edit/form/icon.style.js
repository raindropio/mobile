import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'

export const IconTap = styled.TouchableOpacity`
	align-items: center;
	padding: ${paddingHorizontal}px;
	background-color: ${themed.main};
`