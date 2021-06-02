import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import Sortable from './component'
import { options } from '../basic'

export default styled(Sortable).attrs(options)`
	${({disableVirtualization})=>!disableVirtualization?'flex: 1;':''}
`

export const dragItemStyle = ({ theme, dragState }) => {
    let styles = ''

    switch(dragState) {
        case 'ghost':
            styles+= `
                background: ${theme.background.regular};
                shadow-radius: 20px;
                shadow-opacity: 0.3;
                shadow-offset: 0 5px;
                elevation: 5;
                border-top-width: ${StyleSheet.hairlineWidth}px;
                border-bottom-width: ${StyleSheet.hairlineWidth}px;
                border-color: ${theme.color.border};
            `;
            break

        case 'selected':
            styles += 'opacity: 0';
            break
    }

    if (styles)
        return styles
}