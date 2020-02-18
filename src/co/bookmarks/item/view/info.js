import React from 'react'
import { View } from 'react-native'
import _ from 'lodash-es'
import t from 't'
import CollectionContainer from './collection'
import {
	styles,
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
		audio: <ItemTypeImage key='article' source={require('assets/images/audioSmall.png')} />,
		document: <ItemTypeImage key='article' source={require('assets/images/documentSmall.png')} />
	}

const removeEmRegex = /<\/{0,1}em>/g
const removeEm = (body='')=>_.unescape(body.replace(removeEmRegex, ''))

const SpaceItemInfo = ({item, highlight, spaceId, view, onCollectionPress})=>{
	const { title, excerpt, type, tags, domain, broken, important, collectionId, lastUpdate } = item

	return [
		<ItemTitle key='title' bold={true} numberOfLines={2} strikeLine={broken}>{title}</ItemTitle>,
		excerpt ? <View style={styles.footer} key='excerpt' ><ItemDescription numberOfLines={view=='list' ? 2 : 1}>{excerpt}</ItemDescription></View> : null,
		highlight.body ? <View style={styles.body} key='body' ><ItemDescription numberOfLines={4}>{removeEm(highlight.body)}</ItemDescription></View> : null,

		tags ? (<View style={styles.footer} key='tags'><ItemTags numberOfLines={4}>{tags}</ItemTags></View>) : null,
		
		(
			<View style={styles.footer} key='footer'>
				
				{important ? starComponent : null}
				{broken ? brokenComponent : null}
				{type!='link' ? types[type] : null}
				<ItemSubinfo numberOfLines={1} ellipsizeMode='head'>{cleanDomain(domain)}  ·  {shortDate(lastUpdate)}</ItemSubinfo>
			</View>
		),

		item.collectionId != spaceId ? (
			<View style={styles.footer} key='collectionPath'>
				<CollectionContainer collectionId={collectionId} onPress={onCollectionPress} />
			</View>
		) : null
	]
}

export default SpaceItemInfo