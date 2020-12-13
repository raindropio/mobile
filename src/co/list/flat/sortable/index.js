import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import styled from 'styled-components/native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { options } from '../basic'

const DragPlaceholderInner = styled.View`
	background: ${({theme}) => theme.background.alternative};
	flex: 1;
`
function DragPlaceholder({index}) {
	React.useEffect(()=>
		ReactNativeHapticFeedback.trigger('impactLight'),
		[index]
	)
	return <DragPlaceholderInner />
}

export default styled(DraggableFlatList).attrs(props=>({
	...options(props),
	activationDistance: 10,
	scrollEventThrottle: 100,
	autoscrollSpeed: 200,
	dragItemOverflow: false,
	onScrollOffsetChange: props.onScroll,
	renderPlaceholder: ()=><DragPlaceholder />
}))`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export const dragItemStyle = ({ theme, isDrag }) => {
    let styles = ''

    if (isDrag)
        styles+= `
            background: ${theme.background.regular};
            shadow-radius: 20px;
            shadow-opacity: 0.3;
            shadow-offset: 0 5px;
            elevation: 5;
            border-top-width: ${StyleSheet.hairlineWidth}px;
            border-bottom-width: ${StyleSheet.hairlineWidth}px;
            border-color: ${theme.color.border};
            ${Platform.OS=='android' ? 'transform: translateY(-3px);' : ''}
        `

    if (styles)
        return styles
}