import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import {height, gap, paddingVertical} from 'co/style/baloon'

//Current items
export const CurrentItems = styled.FlatList.attrs({
	keyboardDismissMode:'on-drag',
	keyboardShouldPersistTaps:'always'
})`
	padding-horizontal: ${paddingHorizontal-(gap/2)-4}px;
	padding-vertical: ${paddingVertical}px;
	flex-grow: 0;
	flex-basis: ${height+paddingVertical*2}px;
`