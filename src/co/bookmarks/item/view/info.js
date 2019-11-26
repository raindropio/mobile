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
import { short as shortDate } from 'modules/format/date'
import Badge from 'co/common/badge'

const starSmall = require('assets/images/starSmall.png')

const 
	starComponent = <ItemStarImage key='important' source={starSmall} />,
	brokenComponent = <Badge key='broken' text={t.s('broken')} marginRight={true} />,
	types = {
		article: <ItemTypeImage key='article' source={require('assets/images/articleSmall.png')} />,
		image: <ItemTypeImage key='image' source={require('assets/images/imageSmall.png')} />,
		video: <ItemTypeImage key='article' source={require('assets/images/videoSmall.png')} />,
		audio: <ItemTypeImage key='article' source={require('assets/images/videoSmall.png')} />,
		document: <ItemTypeImage key='article' source={require('assets/images/articleSmall.png')} />
	}

const SpaceItemInfo = ({item, showCollectionPath, view, onCollectionPress})=>{
	const { title, excerpt, type, tags, domain, broken, important, collectionId, lastUpdate } = item

	return [
		<ItemTitle key='title' bold={true} numberOfLines={2} strikeLine={broken}>{title}</ItemTitle>,
		excerpt ? <ItemFooterView key='excerpt' ><ItemDescription numberOfLines={view=='list' ? 2 : 1}>{excerpt}</ItemDescription></ItemFooterView> : null,

		tags ? (<ItemFooterView key='tags'><ItemTags numberOfLines={4}>{tags}</ItemTags></ItemFooterView>) : null,
		
		(
			<ItemFooterView key='footer'>
				
				{important ? starComponent : null}
				{broken ? brokenComponent : null}
				{type!='link' ? types[type] : null}
				<ItemSubinfo numberOfLines={1} ellipsizeMode='head'>{cleanDomain(domain)}  ·  {shortDate(lastUpdate)}</ItemSubinfo>
			</ItemFooterView>
		),

		showCollectionPath ? (
			<ItemFooterView key='collectionPath'>
				<CollectionContainer collectionId={collectionId} onPress={onCollectionPress} />
			</ItemFooterView>
		) : null
	]
}

export default SpaceItemInfo