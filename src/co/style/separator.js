import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {themed} from 'co/style/colors'
import { paddingHorizontal } from 'co/style/constants'

export default styled.View`
	height: ${StyleSheet.hairlineWidth}px;
	background-color: ${themed.invertedLight};
	margin-left: ${paddingHorizontal}px;
`