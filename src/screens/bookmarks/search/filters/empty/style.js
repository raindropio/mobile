import styled from 'styled-components/native'
import { themed } from 'co/style/colors'

export const Wrap = styled.View`
    justify-content: center;
    align-items: center;
    padding-vertical: 30px;
`

export const Message = styled.Text`
    color: ${themed.invertedMedium};
`