/*
    <Icon
        name=''
        size=number             optional, 24 by default
        variant=line|fill       optional, line by default
        color=string            optional, string from theme.color, for example accent
*/
import _ from 'lodash'
import styled from 'styled-components/native'
import remixicon from '../../assets/fonts/remixicon.glyph.json'
import size from 'modules/appearance/size'

//icons list {name: value}
let icons = {}
Object.entries(remixicon).forEach(([name, {unicode}])=>{
    if (!name.endsWith('fill') && !name.endsWith('line'))
        name += '-line'
    icons[name] = String.fromCharCode(unicode.replace(/^&#/, '0').replace(/;$/, ''))
})

export default styled.Text.attrs(({ name, variant='line' })=>({
    children: icons[name+(variant ? `-${variant}` : '')]
}))`
    font-family: remixicon;
    font-size: ${props=>props.size||size.height.icon}px;
    width: ${props=>props.size||size.height.icon}px;
    height: ${props=>props.size||size.height.icon}px;
    color: ${({ color, theme })=>theme.color[color] || _.get(theme, color) || theme.text.secondary};
    margin: 2px;
`