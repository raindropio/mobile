import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

export const options = ({ data, sections, keyboardDismissMode, removeClippedSubviews=true, theme })=>({
	contentContainerStyle: !(data || sections).length ? {flex: 1} : null,
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: keyboardDismissMode || 'on-drag',
	keyboardShouldPersistTaps: 'always',
	indicatorStyle: theme.dark ? 'white' : 'default',
	removeClippedSubviews
	//ItemSeparatorComponent
})

export default styled(Animated.createAnimatedComponent(FlatList)).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`