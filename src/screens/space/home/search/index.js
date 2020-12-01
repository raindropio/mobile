import React from 'react'
import SearchBar from 'co/form/search'

export default class BrowseSearch extends React.Component {
    onPress = ()=>
        this.props.navigation.navigate('search', { spaceId: 0 })

    render() {
        return (
            <SearchBar
                onPress={this.onPress} />
        )
    }
}