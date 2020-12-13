import React from 'react'
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