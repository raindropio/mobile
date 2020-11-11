import styled from 'styled-components'


export const Wrap = styled.SafeAreaView`
    position: absolute;
    bottom: ${({ theme })=>theme.padding.large}px;
    left: ${({ theme })=>theme.padding.large}px;
    height: 48px;
    background: ${({ theme })=>theme.color.accent};
    border-radius: 24px;
`