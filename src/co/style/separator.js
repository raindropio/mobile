import styled from 'styled-components/native'
import {StyleSheet} from 'react-native'
import {themed} from 'co/style/colors'

export const separatorHeight = StyleSheet.hairlineWidth

export default styled.View`
	height: ${separatorHeight};
	background-color: ${themed.invertedLight};
`