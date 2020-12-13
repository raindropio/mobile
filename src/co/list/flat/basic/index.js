import styled from 'styled-components/native'
import { FlatList } from 'react-native-gesture-handler'

export const options = props=>({
	contentContainerStyle: !(props.data || props.sections).length ? {flex: 1} : null,
	directionalLockEnabled: true,
	stickySectionHeadersEnabled: true,
	keyboardDismissMode: 'on-drag',
	keyboardShouldPersistTaps: 'always',
	indicatorStyle: props.theme.dark ? 'white' : 'default',
	removeClippedSubviews: false
	//ItemSeparatorComponent
})

export default styled(FlatList).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`