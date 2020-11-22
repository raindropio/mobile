import React from 'react'
import { Animated, Easing } from 'react-native'
import { List } from './inline.style'

function isLoaded({ status, tags, filters }) {
    return status == 'loaded' && (tags.length || filters.length)
}

class SearchSuggestionsInline extends React.Component {
    state = {
        style: {
            overflow: 'hidden',
            opacity: new Animated.Value(0)
        }
    }

    keyExtractor = (item) => item._id

    componentDidUpdate (prevProps) {
        const prevLoaded = isLoaded(prevProps)
        const loaded = isLoaded(this.props)

        if (prevLoaded != loaded)
            Animated.timing(this.state.style.opacity, {
                toValue: loaded ? 1 : 0,
                duration: 500,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: true
            }).start()
    }

    render() {
        const { tags, filters, renderItem } = this.props
        const { style } = this.state

        return (
            <Animated.View style={style}>
                <List
                    data={[...tags, ...filters]}
                    keyExtractor={this.keyExtractor}
                    renderItem={renderItem} />
            </Animated.View>
        )
    }
}

export default SearchSuggestionsInline