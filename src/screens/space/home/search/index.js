import { Component } from 'react';
import SearchBar from 'co/form/search'

export default class BrowseSearch extends Component {
    onPress = ()=>
        this.props.navigation.navigate('search', { spaceId: 0 })

    render() {
        return (
            <SearchBar
                onPress={this.onPress} />
        )
    }
}