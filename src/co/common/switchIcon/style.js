import styled from 'styled-components/native'
import { paddingHorizontal } from 'co/style/constants'
import {themed} from 'co/style/colors'

export const SwitchIconView = styled.View`
	flex-direction: row;
	align-items: center;
`

export const SwitchIconItem = styled.View`
	border-radius: 10px;
	overflow: hidden;
`

export const SwitchIconImage = styled.Image`
	margin: ${paddingHorizontal-4}px ${paddingHorizontal}px;
	tint-color: ${props => props.selected ? themed.tintColor(props) : themed.invertedLight(props)};
`