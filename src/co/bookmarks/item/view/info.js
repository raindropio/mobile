import React from 'react'
import t from 't'
import CollectionContainer from './collection'
import {
	ItemFooterView,
	ItemTitle,
	ItemTags,
	ItemDescription,
	ItemSubinfo,
	ItemStarImage,
	ItemTypeImage
} from 'co/style/item'
import { cleanDomain } from 'modules/format/string'
import Badge from 'co/common/badge'

const starSmall = require('assets/images/starSmall.png')

const 
	starComponent = <ItemStarImage key='important' source={starSmall} />,
	brokenComponent = <Badge key='broken' text={t.s('broken')} marginRight={true} />,
	types = {
		article: <ItemTypeImage key='article' source={require('assets/images/articleSmall.png')} />,
		image: <ItemTypeImage key='image' source={require('assets/images/imageSmall.png')} />,
		video: <ItemTypeImage key='article' source={require('assets/images/videoSmall.png')} />
	}

const SpaceItemInfo = ({item, showCollectionPath, view})=>{
	const { title, excerpt, type, tags, domain, broken, important, collectionId } = item

	return [
		<ItemTitle key='title' bold={true} numberOfLines={2} strikeLine={broken}>{title}</ItemTitle>,
		excerpt ? <ItemFooterView key='excerpt' ><ItemDescription numberOfLines={view=='list' ? 2 : 1}>{excerpt}</ItemDescription></ItemFooterView> : null,

		tags ? (<ItemFooterView key='tags'><ItemTags numberOfLines={4}>{tags}</ItemTags></ItemFooterView>) : null,
		
		(
			<ItemFooterView key='footer'>
				{showCollectionPath ? <CollectionContainer collectionId={collectionId} /> : null}
				{important ? starComponent : null}
				{broken ? brokenComponent : null}
				{type!='link' ? types[type] : null}
				{!showCollectionPath ? <ItemSubinfo numberOfLines={1}>{cleanDomain(domain)}</ItemSubinfo> : null}
			</ItemFooterView>
		),
	]
}

export default SpaceItemInfo