import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'
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

const BaseList = styled(Animated.createAnimatedComponent(FlatList)).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export default function List(props) {
	const insets = useSafeAreaInsets()
	return <BaseList {...props} contentContainerStyle={{
		paddingBottom: insets.bottom,
		paddingLeft: insets.left,
		paddingRight: insets.right
	}} />
}