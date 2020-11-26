import React from 'react'
import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Icon from '../icon'

const Wrap = styled(SafeAreaView).attrs({
    edges: ['bottom', 'right']
})`
    position: absolute;
    right: 24px;
    bottom: 8px;
`

const Button = styled(RectButton)`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${({theme})=>theme.color.accent};
    align-items: center;
    justify-content: center;
    shadow-radius: 5px;
    shadow-opacity: 0.3;
    shadow-offset: 0 3px;
    border-width: ${StyleSheet.hairlineWidth}px;
    border-color: #00000030;
    elevation: 5;
`

export default function Fab(props) {
    return (
        <Wrap>
            <Button {...props}>
                <Icon 
                    name='add'
                    color='background.regular' />
            </Button>
        </Wrap>
    )
}