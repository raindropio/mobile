import React from 'react'
import { Keyboard } from 'react-native'
import { List } from './inline.style'

class SearchSuggestionsInline extends React.Component {
    state = {
        keyboard: true
    }

    keyExtractor = ({_id})=>_id

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.onKeyboardShow)
        Keyboard.addListener('keyboardDidHide', this.onKeyboardHide)
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardDidShow', this.onKeyboardShow)
        Keyboard.removeListener('keyboardDidHide', this.onKeyboardHide)
    }

    onKeyboardShow = ()=>
        this.setState({ keyboard: true })

    onKeyboardHide = ()=>
        this.setState({ keyboard: false })

    render() {
        const { keyboard } = this.state
        const { tags, filters, renderItem, status } = this.props

        if (!keyboard || 
            status != 'loaded' ||
            (!tags.length && !filters.length))
            return null

        return (
            <List
                data={[...tags, ...filters]}
                keyExtractor={this.keyExtractor}
                renderItem={renderItem} />
        )
    }
}

export default SearchSuggestionsInline