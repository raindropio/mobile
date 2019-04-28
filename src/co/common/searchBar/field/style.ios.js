import t from 't'
import styled from 'styled-components/native'
import SearchBar from 'react-native-search-bar'
import { themed, themeIsDark } from 'co/style/colors'
import { topBarHeight } from 'modules/native'

export const Wrap = styled.View`
    flex-direction: row;
    height: ${topBarHeight}px;
`

export const Field = styled(SearchBar).attrs(props => ({
    barStyle: themeIsDark(props) ? 'black' : 'default',
    keyboardAppearance: themeIsDark(props) ? 'dark' : 'default',
    hideBackground: true,
    barTintColor: themed.main(props),
    textFieldBackgroundColor: themed.invertedExtraLight(props),
    tintColor: themed.tintColor(props),
    textColor: themed.inverted(props),
    cancelButtonText: t.s('cancel'),
    autoCapitalize: 'none',
    autoCorrect: false,
    enablesReturnKeyAutomatically: false
}))`
    flex: 1;
    margin: 2px;
`

export const Tap = styled.TouchableOpacity`
    padding-left: 14px;
    padding-top: 3px;
    height: ${topBarHeight}px;
    justify-content: center;
`

export const BackIcon = styled.Image.attrs({
    source: require('assets/images/backButton.png')
})`
    tint-color: ${themed.tintColor};
`