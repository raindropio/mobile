import styled from 'styled-components/native'

const colorMap = {
    yellow: '#F2D900',
    red: '#F0665C',
    green: '#13C165',
    blue: '#4863C1',
}

export const Wrap = styled.View`
    flex-direction: row;
    margin: 5px 0;
`

export const Tick = styled.View`
    background: ${({color})=>colorMap[color||'yellow'] || color};
    width: 3px;
    border-radius: 3px;
    margin-right: 7px;
`