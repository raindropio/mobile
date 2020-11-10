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
	ItemSubinfo
} from 'co/style/item'
import { cleanDomain } from 'modules/format/string'
import { short as shortDate } from 'modules/format/date'
import Badge from 'co/common/badge'
import Icon from 'co/icon'

const 
	starComponent = <Icon name='heart-3' variant='fill' size='16' color='accent' />,
	brokenComponent = <Badge key='broken' text={t.s('broken')} marginRight={true} />,
	types = {
		article: <Icon name='article' variant='fill' size='16' />,
		image: <Icon name='image' variant='fill' size='16' />,
		video: <Icon name='video' variant='fill' size='16' />,
		audio: <Icon name='mv' variant='fill' size='16' />,
		document: <Icon name='file-text' variant='fill' size='16' />
	}

const removeEmRegex = /<\/{0,1}em>/g
const removeEm = (body='')=>_.unescape(body.replace(removeEmRegex, ''))

const SpaceItemInfo = ({item, highlight, spaceId, view, onCollectionPress})=>{
	const { title, excerpt, type, tags, domain, broken, important, collectionId, created, lastUpdate } = item

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
				<ItemSubinfo numberOfLines={1} ellipsizeMode='head'>{cleanDomain(domain)}  ·  {shortDate(created||lastUpdate)}</ItemSubinfo>
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