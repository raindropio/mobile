import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'co/native'

const Wrap = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export default function ExtensionInitLoading() {
    return (
        <Wrap>
            <ActivityIndicator />
        </Wrap>
    )
}