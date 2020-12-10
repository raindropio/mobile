import styled from 'styled-components/native'
import DraggableFlatList from 'react-native-draggable-flatlist'
import { options } from '../basic'

export default styled(DraggableFlatList).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`