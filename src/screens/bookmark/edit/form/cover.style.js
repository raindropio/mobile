import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import { themed } from 'co/style/colors'
import TouchItem from 'co/common/touchItem'

export const CoverTap = styled(TouchItem)`
	align-items: center;
	padding: ${paddingHorizontal/2}px;
	background-color: ${themed.main};
`