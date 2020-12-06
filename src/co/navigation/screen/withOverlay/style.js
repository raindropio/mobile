import styled from 'styled-components/native'
import { isTablet } from 'modules/native'

export const Wrap = styled.View`
    flex: 1;
    justify-content: ${isTablet ? 'center' : 'flex-end'};
    align-items: center;
`

export const Backdrop = styled.Pressable`
    flex: 1;
    height: 100%;
    background: #00000001;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
`

export const Body = styled.View`
    z-index: 1;
    border-radius: ${isTablet ? 8 : 0}px;
    width: 100%;
    max-width: ${isTablet ? '480px' : '100%'};
    height: ${({height})=>height}px;
    background: ${({theme})=>theme.background.alternative};
    elevation: 10;
`