import React from 'react'
import { FlatList } from 'react-native'
import TagView from 'co/tags/item'

export default class TagsList extends React.PureComponent {
    keyExtractor = ({name})=>name

    renderItem = ({item})=>(
        <TagView {...item} />
    )

    render() {
        return (
            <FlatList 
                style={{flex: 1}}
                data={this.props.items}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                />
        )
    }
}