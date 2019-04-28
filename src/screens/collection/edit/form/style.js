import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import { 
	fontSize,
	paddingHorizontal
} from 'co/style/constants'
import {themed} from 'co/style/colors'

const share = require('assets/images/share.png')

export const ShareButton = styled.TouchableOpacity`
	padding-horizontal: ${paddingHorizontal}px;
	padding-vertical: 12px;
`

export const ShareIcon = styled.Image.attrs({
	source: share
})`
	tint-color: ${themed.tintColor};
`