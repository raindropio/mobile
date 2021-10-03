import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export const options = props=>({
	contentContainerStyle: !(props.data || props.sections).length ? {flex: 1} : null,
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: props.keyboardDismissMode || 'on-drag',
	keyboardShouldPersistTaps: 'always',
	indicatorStyle: props.theme.dark ? 'white' : 'default',
	removeClippedSubviews: true
	//ItemSeparatorComponent
})

export default styled(Animated.createAnimatedComponent(FlatList)).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`