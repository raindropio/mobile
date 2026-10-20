import styled from 'styled-components/native'
import { LegacyFlatList as FlatList, LegacyRefreshControl } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const options = props=>({
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	indicatorStyle: props.theme.dark ? 'white' : 'default',
	removeClippedSubviews: false //buggy on old androids
	//ItemSeparatorComponent
})

//gesture-handler FlatList renders its own scroll component, so VirtualizedList never
//creates a RefreshControl from onRefresh; it has to be passed explicitly
export function refreshControl({ onRefresh, refreshing=false }) {
	if (typeof onRefresh != 'function') return undefined
	return <LegacyRefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
}

const BaseList = styled(Animated.createAnimatedComponent(FlatList)).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export default function List({ onRefresh, refreshing, ...props }) {
	const insets = useSafeAreaInsets()
	return <BaseList {...props} refreshControl={refreshControl({ onRefresh, refreshing })} contentContainerStyle={{
		paddingBottom: insets.bottom,
		paddingLeft: insets.left,
		paddingRight: insets.right
	}} />
}