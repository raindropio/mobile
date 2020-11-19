import React from 'react'
import Collections from 'co/collections/items'

class SearchCollections extends React.Component {
	onItemPress = async({ _id })=>
		this.props.onCollectionPress(_id)

	render() {
        const { query='', spaceId } = this.props

        if (!query.trim() || parseInt(spaceId))
            return null

		return (
            <Collections 
                options={{search: query, showCreateNew: false}}
                SearchComponent={null}
                disableVirtualization={true}
                onItemPress={this.onItemPress} />
		)
	}
}

export default SearchCollections