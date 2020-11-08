import React from 'react'
import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import SafeAreaView from 'react-native-safe-area-view'
import Icon from '../icon'

const Wrap = styled(SafeAreaView)`
    position: absolute;
    right: 20px;
    bottom: 20px;
`

const Button = styled(RectButton)`
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background-color: ${({theme})=>theme.color.accent};
    align-items: center;
    justify-content: center;
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