import styled from 'styled-components/native'
import { KeyboardAvoidingView } from 'co/native'

export const Wrap = styled(KeyboardAvoidingView).attrs({
    verticalOffset: false
})`
    flex: 1;
`